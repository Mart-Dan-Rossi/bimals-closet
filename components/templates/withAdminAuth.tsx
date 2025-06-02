import { useHydratedStoreState } from "@/hooks/state/hydrated";
import { Center } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { ComponentType, useEffect, useMemo, useState } from "react";

export const withAdminAuth = <T extends object>(
	WrappedComponent: ComponentType<T>
) => {
	const AuthenticatedComponent = (props: T) => {
		const router = useRouter();
		const [authChecked, setAuthChecked] = useState(false);
		const [renderLoading, setRenderLoading] = useState(true);

		const token = useHydratedStoreState("token");

		useEffect(() => {
			const checkAuthentication = async () => {
				if (token !== undefined && token !== null) {
					const base64Url = token.split(".")[1];
					const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
					const tokenData = JSON.parse(atob(base64));

					if (tokenData.role === "admin") {
						setAuthChecked(true);
						setRenderLoading(false);
					} else {
						router.push("/");
					}
				}
			};

			checkAuthentication();
		}, [token, router]);

		const MemoizedWrappedComponent = useMemo(
			() => <WrappedComponent {...props} />,
			[props]
		);

		if (!authChecked || renderLoading) {
			return (
				<Center justifyContent="center" w="100%">
					{/* SVG Loader */}
					<svg
						version="1.1"
						id="L5"
						xmlns="http://www.w3.org/2000/svg"
						xmlnsXlink="http://www.w3.org/1999/xlink"
						x="0px"
						y="0px"
						viewBox="0 0 100 100"
						enableBackground="new 0 0 0 0"
						xmlSpace="preserve"
					>
						<circle fill="#00AF54" stroke="none" cx="35" cy="50" r="2">
							<animateTransform
								attributeName="transform"
								dur="1s"
								type="translate"
								values="0 15 ; 0 -15; 0 15"
								repeatCount="indefinite"
								begin="0.1"
							/>
						</circle>
						<circle fill="#00AF54" stroke="none" cx="45" cy="50" r="2">
							<animateTransform
								attributeName="transform"
								dur="1s"
								type="translate"
								values="0 10 ; 0 -10; 0 10"
								repeatCount="indefinite"
								begin="0.2"
							/>
						</circle>
						<circle fill="#00AF54" stroke="none" cx="55" cy="50" r="2">
							<animateTransform
								attributeName="transform"
								dur="1s"
								type="translate"
								values="0 5 ; 0 -5; 0 5"
								repeatCount="indefinite"
								begin="0.3"
							/>
						</circle>
					</svg>
				</Center>
			);
		}

		return MemoizedWrappedComponent;
	};

	return AuthenticatedComponent;
};
