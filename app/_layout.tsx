import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{headerShown: true, title:"Your Flashcard Sets"}} />
      <Stack.Screen name="study/[deckId]" options={{ headerShown: true}} />
    </Stack>
  );
}
