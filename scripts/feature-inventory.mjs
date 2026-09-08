#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const manifestPath = path.join(root, 'config/features.json');
const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
const errors = [];
const routeOwners = new Map();

for (const [id, feature] of Object.entries(manifest.features || {})) {
  for (const rel of feature.files || []) {
    if (!fs.existsSync(path.join(root, rel))) errors.push(`${id}: fichier manquant ${rel}`);
  }
  for (const route of feature.routes || []) {
    const previous = routeOwners.get(route);
    if (previous) errors.push(`Route ${route} déclarée par ${previous} ET ${id} (doublon de responsabilité)`);
    routeOwners.set(route, id);
  }
}


const actualRoutes = [];
function walkRoutes(dir) {
  if (!fs.existsSync(dir)) return;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walkRoutes(full);
    else if (entry.isFile() && entry.name === 'route.ts') {
      const rel = path.relative(path.join(root, 'app'), path.dirname(full)).split(path.sep).join('/');
      actualRoutes.push('/' + rel);
    }
  }
}
walkRoutes(path.join(root, 'app', 'api'));
for (const route of actualRoutes) {
  if (!routeOwners.has(route)) errors.push(`Route réelle ${route} sans propriétaire dans config/features.json`);
}
for (const route of routeOwners.keys()) {
  if (!actualRoutes.includes(route)) errors.push(`Route déclarée ${route} absente de app/api`);
}

if (process.argv.includes('--list')) {
  console.log('Africa SaaS Kit — Feature inventory');
  for (const [id, feature] of Object.entries(manifest.features || {})) {
    console.log(`${feature.optional ? 'OPTIONNEL' : 'CORE'}  ${id} — ${feature.description}`);
  }
}

if (errors.length) {
  console.error('Feature manifest check: FAIL');
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}
console.log(`Feature manifest check: PASS (${Object.keys(manifest.features || {}).length} features, ${routeOwners.size} routes owned, ${actualRoutes.length} routes scanned)`);
