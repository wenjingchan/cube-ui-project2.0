<template>
  <div>
    <input type="file" name="file" accept="image/*" @change="change" ref="selectImg">
  </div>
</template>
<script>
import {mapActions} from 'vuex'
import *as types from '@/utils/actions-type'
export default {
  methods:{
    ...mapActions([types.UPLOAD]),
    change(e){
      // console.log(e.target.files[0])
     
      var formFile = new FormData();
      formFile.append('file',e.target.files[0]);
      this[types.UPLOAD](formFile);
    },
    show(){
      this.$refs.selectImg.click();
    }
  }
}
</script>