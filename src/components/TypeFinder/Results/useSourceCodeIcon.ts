import { ReactComponent as GithubIcon } from '@/assets/icons/github.svg';
import GitlabIcon from '@/components/Icons/GitLab';
import BitbucketIcon from '@/components/Icons/Bitbucket';
import { ReactComponent as GitIcon } from '@/assets/icons/git.svg';

const repositoryMap = {
  'github.com': GithubIcon,
  'gitlab.com': GitlabIcon,
  'bitbucket.org': BitbucketIcon,
};

function useSourceCodeIcon(repositoryUrl?: string) {
  if (!repositoryUrl) {
    return undefined;
  }

  const [, FoundIcon] =
    Object.entries(repositoryMap).find(([domain]) => {
      return repositoryUrl.match(domain);
    }) || [];

  return FoundIcon ?? GitIcon;
}

export default useSourceCodeIcon;
