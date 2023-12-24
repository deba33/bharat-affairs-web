import Image from "next/image";

export default function PrimaryAppbar() {
  return (
    <div className="w-full bg-slate-800 flex flex-col md:flex-row items-center">
      <div className="w-12 h-12 m-4  max-md:hidden">
        <Image alt="logo" src="/icon-512.png" width={50} height={50} />
      </div>

      <p className="text-2xl m-4 max-md:mt-4 max-md:mb-0 text-slate-300">
        Bharat Affairs
      </p>
      <div className="grow max-md:hidden"></div>
      <div className="w-52 h-auto">
        <a
          href="https://play.google.com/store/apps/details?id=com.debabrata.bharataaffairs&pcampaignid=pcampaignidMKT-Other-global-all-co-prtnr-py-PartBadge-Mar2515-1"
          target="_blank"
        >
          <Image
            alt="Get it on Google Play"
            src="https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png"
            width={200}
            height={50}
          />
        </a>
      </div>
    </div>
  );
}
