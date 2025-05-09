import routes from '../constants/routes';

const UnauthorizedPage = () => {
  return (
    <main className="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
      <div className="text-center">
        <p className="text-base font-semibold text-default-orange">403</p>
        <h1 className="mt-4 text-balance text-5xl font-semibold tracking-tight text-gray-900 sm:text-7xl">Access Denied</h1>
        <p className="mt-6 text-pretty text-lg font-medium text-gray-500 sm:text-xl/8">Sorry, You do not have authorization to access this page.</p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <a
            href={routes.DEFAULT}
            className="rounded-md bg-default-orange px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-default-orange"
          >
            Go back home
          </a>
        </div>
      </div>
    </main>
  );
};

export default UnauthorizedPage;
