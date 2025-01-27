# instructions on how to integrate, run, and deploy the Workout Tracker app.


1. Install dependencies:

```plaintext
pnpm install
```


2. Generate placeholder images for exercises:

```plaintext
pnpm generate-images
```


3. Replace placeholder images with actual exercise demonstrations:

1. Navigate to the `public/exercise-images` directory
2. Replace the placeholder `.jpg` files with actual images for each exercise
3. Ensure the filenames match the exercise names (lowercase, hyphenated)
4. Example: `pec-deck-fly.jpg`, `bb-bench-press.jpg`, etc.



4. Set up environment variables:

1. Create a `.env.local` file in the root directory
2. Add the following line:

```plaintext
NEXT_PUBLIC_APP_URL=http://localhost:3000
```





5. Run the development server:

```plaintext
pnpm dev
```


7. Open your browser and navigate to `http://localhost:3000`
8. You should now see the Workout Tracker app running locally
9. Click on "Start Workout" to begin tracking your workouts
10. Navigate through the exercises and phases using the "Next Workout" button
11. Click on "View Exercise" for any exercise to see its demonstration image


To make changes or extend the app:

- Modify the workout program in `lib/workoutData.ts`
- Update UI components in the `app` directory
- Add new pages or features as needed


Restart the development server after making changes to environment variables or adding new dependencies.
