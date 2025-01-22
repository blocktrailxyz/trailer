import app from '../app'; // Assuming your app is exported

(async () => {
  await app.ready(); // Ensure all routes are registered
  console.log(app.printRoutes());
})();
