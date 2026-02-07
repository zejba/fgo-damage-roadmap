import { PageTitle } from '../components/PageTitle';

function NewsPage() {
  return (
    <>
      <PageTitle>お知らせ・更新履歴</PageTitle>
      <ul>
        <li>2026/02/08 - DTDRが入力できない問題を修正しました。</li>
        <li>2026/02/08 - ターン追加時に前ターンの一部のパラメータを引き継ぐように変更しました。</li>
      </ul>
    </>
  );
}

export default NewsPage;
