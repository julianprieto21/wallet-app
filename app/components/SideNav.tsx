import NavLinks from "./NavLinks";
import { lang } from "@/app/lib/const/string-en";
import { PowerIcon, UserIcon, WalletIcon } from "@heroicons/react/24/outline";
import { auth, signOut } from "@/auth";
import { MenuButtonSmallScreen } from "./MenuButton";
import HLine from "./HLine";

function LogOutButton() {
  return (
    <form
      action={async () => {
        "use server";
        await signOut();
      }}
    >
      <button
        title="Log Out"
        type="submit"
        className="flex h-[3rem] w-full grow items-center justify-start gap-2 text-neutral-400 text-md font-normal hover:bg-neutral-700 hover:text-red-500 sm:flex-none sm:justify-center lg:justify-start md:p-2 md:px-3"
      >
        <PowerIcon className="size-6" />
        <p className="block sm:hidden lg:block">Logout</p>
      </button>
    </form>
  );
}

export default async function SideNav() {
  let session;
  try {
    session = await auth();
  } catch (error) {
    console.log(error);
  }
  return (
    <div className="w-full sm:w-[20%] flex flex-col items-center justify-center bg-neutral-900 h-auto sm:pb-2">
      <section className="w-full flex flex-col text-neutral-200 bg-gray-800 py-4 sm:pb-2 lg:py-4 border-b border-gray-700">
        <div className="flex justify-center">
          <WalletIcon className="hidden md:block md:size-36 lg:size-52 antialiased" />
        </div>
        <section className="flex flex-row sm:flex-col lg:flex-row justify-between lg:justify-center items-center px-4 md:px-2 xl:px-1 sm:gap-2 lg:gap-0">
          <h1 className="hidden font-semibold md:block md:text-xl lg:text-3xl xl:text-4xl 2xl:text-5xl">
            WALLET APP
          </h1>
          {session && session.user?.image ? (
            <img
              src={session.user.image}
              alt="Foto de perfil de usuario"
              className="rounded-full size-14 md:hidden"
            ></img>
          ) : (
            <UserIcon className="rounded-full size-14 bg-neutral-100 py-1 text-neutral-800" />
          )}
          <MenuButtonSmallScreen />
        </section>
      </section>
      <div className="hidden sm:flex flex-col gap-2 w-full h-[90%] pt-6">
        <NavLinks isLogIn={session ? true : false} />
        {session ? <LogOutButton /> : null}
      </div>
      <footer className="w-full hidden sm:flex  flex-col justify-center items-center">
        <HLine width={90} color="neutral" />
        <h1 className="text-xs md:text-sm text-center font-light text-neutral-500 pt-2">
          {lang.footerText}
        </h1>
      </footer>
    </div>
  );
}
