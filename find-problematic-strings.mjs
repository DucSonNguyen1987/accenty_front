// find-problematic-strings.mjs
// Enregistrez ce fichier avec l'extension .mjs pour indiquer qu'il utilise les modules ES

import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

// Obtenir le répertoire actuel avec ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Chaînes à rechercher
const problematicPatterns = [
  '%PUBLIC_URL%',
  '\\%[^\\s]*\\%',  // Tous les motifs comme %QUELQUE_CHOSE%
  '\\s+src="[^"]*\\s+[^"]*"', // Espaces dans les attributs src
  'ñ', 'é', 'à', 'è', 'ù', 'â', 'ê', 'î', 'ô', 'û', // Caractères accentués
  '\\\\u', // Caractères Unicode échappés
];

// Extensions de fichiers à vérifier
const fileExtensions = ['.js', '.jsx', '.ts', '.tsx', '.html', '.css', '.scss', '.json', '.svg'];

// Répertoires à ignorer
const ignoreDirs = ['node_modules', 'dist', 'build', '.git'];

// Fonction récursive pour parcourir tous les fichiers
function scanDir(directory) {
  const files = fs.readdirSync(directory);
  
  for (const file of files) {
    const fullPath = path.join(directory, file);
    const stat = fs.statSync(fullPath);
    
    // Ignorer les répertoires définis
    if (stat.isDirectory() && !ignoreDirs.includes(file)) {
      scanDir(fullPath);
      continue;
    }
    
    // Vérifier seulement les extensions que nous voulons
    const ext = path.extname(file).toLowerCase();
    if (!fileExtensions.includes(ext)) continue;
    
    try {
      // Lire le contenu du fichier
      const content = fs.readFileSync(fullPath, 'utf8');
      
      // Vérifier chaque motif problématique
      for (const pattern of problematicPatterns) {
        const regex = new RegExp(pattern, 'g');
        let match;
        
        while ((match = regex.exec(content)) !== null) {
          const linesBefore = content.substring(0, match.index).split('\n');
          const lineNumber = linesBefore.length;
          const line = linesBefore[linesBefore.length - 1] + content.substring(match.index, content.indexOf('\n', match.index));
          
          console.log(`Fichier: ${fullPath}`);
          console.log(`Ligne ${lineNumber}: ${line.trim()}`);
          console.log(`Motif trouvé: ${match[0]}`);
          console.log('-----------------------------------');
        }
      }
    } catch (err) {
      console.error(`Erreur lors de la lecture de ${fullPath}:`, err.message);
    }
  }
}

console.log('Recherche de chaînes problématiques dans les fichiers...');
scanDir(process.cwd()); // Utiliser le répertoire de travail actuel
console.log('Recherche terminée!');