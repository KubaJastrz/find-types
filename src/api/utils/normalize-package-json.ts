import hostedGitInfo from 'hosted-git-info'
import {PackageJson} from 'type-fest'
import is from '@sindresorhus/is'

export interface RepositoryObject {
  type: string
  url: string
  directory?: string
}

export interface NormalizedPackageJson extends PackageJson {
  repository?: string
}

export function normalizePackageJson(packageJson: PackageJson): NormalizedPackageJson {
  if (!packageJson.repository) {
    return packageJson as any
  }

  const repository: RepositoryObject = is.string(packageJson.repository)
    ? {
        type: 'git',
        url: packageJson.repository,
      }
    : packageJson.repository

  return {
    ...packageJson,
    repository: getRepositoryUrl(repository),
  }
}

function getRepositoryUrl(repository: RepositoryObject) {
  const info = hostedGitInfo.fromUrl(repository.url)

  // unknown git host or non-git repository
  if (!info) {
    return repository.url
  }

  return info.browse(repository.directory as any)
}
