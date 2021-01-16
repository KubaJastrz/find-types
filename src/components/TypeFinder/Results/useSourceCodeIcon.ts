import {Bitbucket, Git, GitHub, GitLab} from '@/components/Icons'

const repositoryMap = {
  'github.com': GitHub,
  'gitlab.com': GitLab,
  'bitbucket.org': Bitbucket,
}

export function useSourceCodeIcon(repositoryUrl?: string) {
  if (!repositoryUrl) {
    return undefined
  }

  const [, FoundIcon] =
    Object.entries(repositoryMap).find(([domain]) => {
      return repositoryUrl.match(domain)
    }) || []

  return FoundIcon ?? Git
}
