<template>
  <div>
    <VitePwaManifest />
    <NuxtPage />
    <!-- App-wide on purpose: a word you don't understand can turn up on a card,
         in a transcript or in tonight's instructions, and the note has to be one
         tap wherever that happens. -->
    <ClientOnly>
      <MarkSelection />
    </ClientOnly>
  </div>
</template>
