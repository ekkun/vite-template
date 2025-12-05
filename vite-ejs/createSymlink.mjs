import { symlink, mkdir } from 'fs';
import { resolve, dirname } from 'path';

// シンボリックリンクを作成する関数
function createSymlink(target, linkPath) {
  symlink(target, linkPath, 'junction', (err) => {
    if (err) {
      console.error('Error creating symlink:', err);
    } else {
      console.log('Symlink created successfully:', linkPath);
    }
  });
}

// 実行するパスを指定
const targetPath = '../../../temp/public/assets/images';
const linkPath = 'src/public/assets/images';

// ディレクトリが存在しない場合は作成
mkdir(dirname(linkPath), { recursive: true }, (err) => {
  if (err) {
    console.error('Error creating directory:', err);
  } else {
    createSymlink(targetPath, linkPath);
  }
});
