# 图片复制脚本
# 将外部Images文件夹中的图片复制到项目images文件夹

$sourceBase = "C:\Users\localadmin\Desktop\Peter web\Images"
$targetBase = "C:\Users\localadmin\Desktop\Peter web\Peter\images"

# 创建目标文件夹
New-Item -ItemType Directory -Force -Path "$targetBase\travel" | Out-Null

# 复制项目图片
Write-Host "复制项目图片..."

# Argentina Museum
if (Test-Path "$sourceBase\Project\Argentina\IMG_9316.jpg") {
    Copy-Item -Path "$sourceBase\Project\Argentina\IMG_9316.jpg" -Destination "$targetBase\argentina-museum.jpg" -Force
    Write-Host "✓ 已复制: argentina-museum.jpg"
}

# Ukraine/Mariupol - 使用第一个PNG文件
if (Test-Path "$sourceBase\Project\ukraine\dreamina-2025-11-21-6446-两个设计结合,按照图二的视角出图.png") {
    # 尝试转换为JPG，如果失败则复制为PNG
    Copy-Item -Path "$sourceBase\Project\ukraine\dreamina-2025-11-21-6446-两个设计结合,按照图二的视角出图.png" -Destination "$targetBase\mariupol-theater.png" -Force
    Write-Host "✓ 已复制: mariupol-theater.png (需要转换为JPG)"
}

# 复制旅行图片
Write-Host "`n复制旅行图片..."

# Kosovo
if (Test-Path "$sourceBase\Travel\Kosovo.JPG") {
    Copy-Item -Path "$sourceBase\Travel\Kosovo.JPG" -Destination "$targetBase\travel\kosovo-1.jpg" -Force
    Write-Host "✓ 已复制: travel\kosovo-1.jpg"
}

# Moldova
if (Test-Path "$sourceBase\Travel\Moldova.JPG") {
    Copy-Item -Path "$sourceBase\Travel\Moldova.JPG" -Destination "$targetBase\travel\moldova-1.jpg" -Force
    Write-Host "✓ 已复制: travel\moldova-1.jpg"
}

# Guatemala
if (Test-Path "$sourceBase\Travel\2017 Guatemala1.jpeg") {
    Copy-Item -Path "$sourceBase\Travel\2017 Guatemala1.jpeg" -Destination "$targetBase\travel\guatemala-1.jpg" -Force
    Write-Host "✓ 已复制: travel\guatemala-1.jpg"
}

if (Test-Path "$sourceBase\Travel\2017 Guatemala.jpeg") {
    Copy-Item -Path "$sourceBase\Travel\2017 Guatemala.jpeg" -Destination "$targetBase\travel\guatemala-2.jpg" -Force
    Write-Host "✓ 已复制: travel\guatemala-2.jpg"
}

Write-Host "`n图片复制完成！"
Write-Host "注意: 如果mariupol-theater.png需要转换为JPG，请手动转换。"
