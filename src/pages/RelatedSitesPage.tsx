import styled from 'styled-components';

const Title = styled.h2`
  margin-top: 4px;
  margin-left: 8px;
`;

const SiteList = styled.ul``;

const SiteItem = styled.li`
  margin-bottom: 12px;
`;

const SiteLink = styled.a`
  color: #0e78e1;
  text-decoration: none;
  font-size: 1.1em;
  &:hover {
    text-decoration: underline;
  }
`;

function RelatedSitesPage() {
  return (
    <>
      <Title>関連サイト</Title>
      <SiteList>
        <SiteItem>
          <SiteLink href="https://x.com/yukimisnowy" target="_blank" rel="noopener noreferrer">
            管理人X
          </SiteLink>
        </SiteItem>
        <SiteItem>
          <SiteLink href="https://zejba.github.io/fgo-play-video-watcher/" target="_blank" rel="noopener noreferrer">
            FGO Play Video Watcher
          </SiteLink>
        </SiteItem>
      </SiteList>
    </>
  );
}

export default RelatedSitesPage;
