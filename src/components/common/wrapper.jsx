import React from 'react';
import {useUserQuery} from "@hooks/useUserQuery";

export default function Wrapper({children}) {
    const {data: {loading}} = useUserQuery();

    if (loading) {
        return null;
    }

    return <React.Fragment>{children}</React.Fragment>
}