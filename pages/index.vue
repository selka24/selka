<template>
  <Tutorial />
</template>

<script>

export default {
  async mounted() {
    //   const { data, error } = await supabase
    //   .from('user')
    //   .insert([
    //     { id: 2, username: 'selka2' }
    //   ]);

    // // Did it work?
    // console.log(data, error, 'supabase');
 

    // let { data: user, error } = await supabase
    //   .from("user")
    //   .select("*")
    //   .eq("username", "selka2");
    // console.log(user, "useriii");
    // Just return the date and note columns of every note
    // let { data: notes, error } = await supabase
    //   .from("notes")
    //   .select("date, note");
  },
};
</script>
