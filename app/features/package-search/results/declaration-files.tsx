import { InlineLink } from "#app/components/inline-link";
import { getCdnFileLink, getTypesFileName, parseRelativePath } from "#app/utils/package";

import { ErrorIcon, ResultEntry, SuccessIcon } from "./results-entry";

interface Props {
	packageName: string;
	packageJsonTypes: string | null;
}

export function DeclarationFiles({ packageName, packageJsonTypes }: Props) {
	return packageJsonTypes ? (
		<ResultEntry type="success" icon={<SuccessIcon />} title="Built-in declaration files">
			<ul className="list-disc pl-5 text-sm">
				<li>
					<InlineLink href={getCdnFileLink(packageName, getTypesFileName(packageJsonTypes))}>
						{parseRelativePath(packageJsonTypes)}
					</InlineLink>
				</li>
			</ul>
		</ResultEntry>
	) : (
		<ResultEntry type="neutral" icon={<ErrorIcon />} title="No built-in declaration files" />
	);
}
