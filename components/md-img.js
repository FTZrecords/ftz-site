import Image from 'next/image';
export default function ImageRenderer({ src, alt }) {
  return <Image src={src} alt={alt} decoding={"async"} loading={"lazy"}/>;
}
