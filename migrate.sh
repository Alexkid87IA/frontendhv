#!/bin/bash

# Script de migration vers DataContext
echo "🚀 Migration vers DataContext..."

# Créer un backup
echo "📦 Création backup..."
cp -r src/pages src/pages.backup
cp -r src/components src/components.backup

# Fonction pour migrer un fichier
migrate_file() {
    local file=$1
    echo "📝 Migration de $file..."
    
    # Créer un fichier temporaire avec les modifications
    cp "$file" "$file.tmp"
    
    # Ajouter import useData après le dernier import
    if ! grep -q "useData" "$file"; then
        # Trouver la dernière ligne d'import et ajouter après
        awk '/^import.*from/ { lastImport = NR } 
             { lines[NR] = $0 } 
             END { 
                 for(i=1; i<=NR; i++) {
                     print lines[i]
                     if(i == lastImport) {
                         print "import { useData } from '\''../context/DataContext'\'';"
                     }
                 }
             }' "$file.tmp" > "$file.new"
        mv "$file.new" "$file.tmp"
    fi
    
    # Commenter l'import getAllArticles
    sed -i '' 's/import.*getAllArticles.*from.*sanityAPI.*/\/\/ &/' "$file.tmp"
    
    # Remplacer useState et useEffect par useData
    perl -i -pe 's/const\s*\[articles?,\s*setArticles?\]\s*=\s*useState\([^\)]*\);/const { recentArticles: articles, isLoading } = useData();/g' "$file.tmp"
    
    # Commenter les useEffect avec getAllArticles
    perl -i -0pe 's/useEffect\s*\(\s*\(\)\s*=>\s*\{[^}]*getAllArticles[^}]*\},\s*\[[^\]]*\]\);/\/\/ Removed useEffect - using DataContext/gs' "$file.tmp"
    
    # Commenter les await getAllArticles
    sed -i '' 's/.*await getAllArticles.*/\/\/ & - Using DataContext/' "$file.tmp"
    
    mv "$file.tmp" "$file"
    echo "✅ $file migré"
}

# Migrer les fichiers principaux
files=(
    "src/pages/HomePage.tsx"
    "src/pages/AllArticlesPage.tsx"
    "src/components/sections/ContentSection.tsx"
    "src/components/layout/ResponsiveNavbar.tsx"
)

for file in "${files[@]}"; do
    if [ -f "$file" ]; then
        migrate_file "$file"
    fi
done

echo ""
echo "✅ Migration terminée !"
echo "📋 Pour vérifier : git diff"
echo "🔄 Pour annuler : cp -r src/pages.backup/* src/pages/ && cp -r src/components.backup/* src/components/"
echo "🧪 Pour tester : npm run dev"
