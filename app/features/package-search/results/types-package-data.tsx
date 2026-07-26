import { type ErrorResponseData, isErrorResponse } from "#app/server-services/package-data/errors";

import type { PackageData } from "#app/server-services/package-data/types";
import { PackageDetails } from "./package-details";
import { ErrorIcon, ResultEntry, SuccessIcon, WarningIcon } from "./results-entry";

interface Props {
	packageData: PackageData | ErrorResponseData | null;
}

export function TypesPackageDetails({ packageData }: Props) {
	if (!packageData) {
		return null;
	}

	if (isErrorResponse(packageData)) {
		return packageData.statusCode === 404 ? (
			<ResultEntry type="neutral" icon={<ErrorIcon />} title="No DefinitelyTyped Package" />
		) : (
			<ResultEntry
				type="neutral"
				icon={<WarningIcon />}
				title="Failed fetching DefinitelyTyped Package"
			/>
		);
	}

	const packageDetails = (
		<PackageDetails packageData={{ ...packageData, description: null }} small />
	);

	return packageData.deprecated ? (
		<ResultEntry type="warning" icon={<WarningIcon />} title="Deprecated DefinitelyTyped Package">
			{packageDetails}
		</ResultEntry>
	) : (
		<ResultEntry type="success" icon={<SuccessIcon />} title="DefinitelyTyped Package">
			{packageDetails}
		</ResultEntry>
	);
}
