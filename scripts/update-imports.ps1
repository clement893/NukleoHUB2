# Script pour mettre à jour les imports vers la structure monorepo
$files = Get-ChildItem -Path "apps\web\app" -Recurse -Include "*.tsx","*.ts" | Where-Object { $_.FullName -notmatch "node_modules" }

foreach ($file in $files) {
    $content = Get-Content $file.FullName -Raw
    
    # Remplacer les imports
    $content = $content -replace "@/components/common", "@nukleohub/ui"
    $content = $content -replace "@/components/commercial", "@nukleohub/commercial/components"
    $content = $content -replace "@/types/commercial", "@nukleohub/types"
    $content = $content -replace "@/lib/utils/cn", "@nukleohub/ui/lib/utils/cn"
    $content = $content -replace "@/lib/db", "@nukleohub/db"
    
    Set-Content -Path $file.FullName -Value $content -NoNewline
    Write-Host "Updated: $($file.FullName)"
}

Write-Host "All imports updated!"

