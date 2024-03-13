import NavLinks from "./NavLinks";
import { lang } from "@/app/lib/const/string-en";
import { Bars3Icon, PowerIcon, UserIcon } from "@heroicons/react/24/outline";
import { auth, signOut } from "@/auth";
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
        className="flex w-full h-[3rem] grow items-start sm:justify-center lg:justify-start justify-start gap-2 rounded-md text-neutral-800 bg-neutral-100 p-3 text-md font-medium hover:text-red-500 hover:bg-red-100"
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
    <div className="w-full sm:w-[20%] flex flex-col items-center justify-center text-neutral-800 bg-neutral-600 h-auto py-2">
      <section className="w-full flex flex-row justify-around sm:justify-center xl:justify-around items-center text-neutral-200 sm:pb-2">
        {session && session.user?.image ? (
          <img
            src={session.user.image}
            alt="Foto de perfil de usuario"
            className="rounded-full size-14"
          ></img>
        ) : (
          <UserIcon className="rounded-full size-14 bg-neutral-100 py-1 text-neutral-800" />
        )}
        <h1 className="text-2xl block sm:hidden xl:block lg:text-2xl 2xl:text-3xl font-bold ">
          {lang.appNameText.toLocaleUpperCase()}
        </h1>
        <Bars3Icon className="sm:hidden size-12" />
      </section>
      <div className="hidden sm:flex flex-col gap-4 w-[90%] h-[90%]">
        <HLine width={100} color="neutral" />
        <NavLinks isLogIn={session ? true : false} />
        {session ? <LogOutButton /> : null}
      </div>
      <footer className="w-full hidden sm:flex  flex-col justify-center items-center">
        <HLine width={90} color="neutral" />
        <h1 className="text-xs md:text-sm text-center font-light text-neutral-400 pt-2">
          {lang.footerText}
        </h1>
      </footer>
    </div>
  );
}
