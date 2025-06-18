import { TbBrandMeta } from "react-icons/tb";
import { IoLogoInstagram } from "react-icons/io";
import { RiTwitterXLine } from "react-icons/ri";

const Topbar = () => {
    return (
        <div className="bg-[#ea2e0e] text-white">
            <div className="container mx-auto flex justify-between items-center py-3 px-4">
                <div className="hidden md:flex items-center space-x-4"> {/*hidden md: for responsive*/}
                    <a href="https://www.facebook.com" className="hover:text-gray-400">
                        <TbBrandMeta className="h-5 w-5" />
                    </a>
                    <a href="https://www.instagram.com/ompatel21_09?igsh=aTJ4NHFpZjk1a290&utm_source=ig_contact_invite" className="hover:text-gray-400">
                        <IoLogoInstagram className="h-5 w-5" />
                    </a>
                    <a href="https://x.com/patel_om24939?t=uBfpOcdEUTrpY5QoO43TBw&s=09" className="hover:text-gray-400">
                        <RiTwitterXLine className="h-4 w-4" />
                    </a>
                </div>
                <div className="text-sm text-center flex-grow">
                    <span>We ship worldwide - Fast and reliable shipping!</span>
                </div>
                <div className="text-sm hidden md:block">
                    <a href="tel:9173768307" className="hover:text-gray-300">
                        +(91) 9173768307
                    </a>
                </div>
            </div>
        </div>
    );
};
export default Topbar;
