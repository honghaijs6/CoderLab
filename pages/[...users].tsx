import { useRouter } from "next/router";
import { lazy, Suspense } from "react";


const Users = () => {

    const router = useRouter();
    if (!router.query?.users) return null;

    const plugin = String(router?.query?.users ? router?.query?.users[1] : "notfound");
    const PluginPreview = lazy(() => import('./plugins/' + plugin));
    return (
        <Suspense >
            <PluginPreview />
        </Suspense>
    )
}

export default Users