import Link from "next/link";

function LinkButton({label, url}) {
    return (
        <Link href={url}>
            <a className={'bg-black text-white px-7 py-3 rounded'}>{label}</a>
        </Link>
    );
}

export default LinkButton;