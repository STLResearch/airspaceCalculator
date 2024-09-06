import Image from 'next/image';

export default function Dropdown() {
  return (
    <div className="flex items-center bg-[#FFFFFF] ">
      <Image src={'./location-point.svg'} alt="location-point" width={24} height={24} className=" mx-4" />
      <div className="flex-col">
        <h3 className="text-bold text-[14px]">111 Sixth Avenue</h3>
        <p className="text-[14px]">Woolgoolga New South Wales 2456, Australia</p>
      </div>
    </div>
  );
}
