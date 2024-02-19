import {memo} from "react";

export const Spinner = memo(({ loading, color = 'primary', size = '5' }) =>
    <>
        {!!loading &&
            <div className={`spinner ${'w-' + size} ${'h-' + size} ${color}`}/>
        }
    </>
)
