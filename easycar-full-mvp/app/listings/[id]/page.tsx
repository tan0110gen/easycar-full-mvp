import dynamic from 'next/dynamic';
const Detail = dynamic(()=>import('../../../components/ListingDetail'), { ssr: false });
export default function Page(){ return <Detail/> }