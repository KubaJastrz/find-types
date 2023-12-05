import hostedGitInfo from "hosted-git-info";
import { type PackageJson } from "type-fest";

export interface RepositoryObject {
  type: string;
  url: string;
  directory?: string;
}

export interface NormalizedPackageJson extends PackageJson {
  repository?: string;
}

export function normalizePackageJson(packageJson: PackageJson): NormalizedPackageJson {
  if (!packageJson.repository) {
    return packageJson as Omit<NormalizedPackageJson, "repository">;
  }

  const repository: RepositoryObject =
    typeof packageJson.repository === "string"
      ? {
          type: "git",
          url: packageJson.repository,
        }
      : packageJson.repository;

  return {
    ...packageJson,
    repository: getRepositoryUrl(repository),
  };
}

function getRepositoryUrl(repository: RepositoryObject) {
  const info = hostedGitInfo.fromUrl(repository.url);

  // unknown git host or non-git repository
  if (!info) {
    return repository.url;
  }

  return info.browse(repository.directory ?? "");
}
