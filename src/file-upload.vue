<template>
  <div id="app">
    <div class="container">
      <!--UPLOAD-->
      <form enctype="multipart/form-data" novalidate v-if="isInitial || isSaving">
        <h1>Upload images</h1>
        <div class="dropbox">
          <input type="file" multiple :name="uploadFieldName" 
            :disabled="isInitial"
            accept="image/*" class="input-file">
            <p v-if="isInitial">
              Drag your file(s) here to begin<br> or click to browse
            </p>
            <p v-if="isSaving">
              Uploading files...
              <!--{{ photos.files.length }} -->
            </p>
        </div>
      </form>
      <!--SUCCESS-->
      <div class="margin-20" v-if="isSuccess">
        <h2>Uploaded {{ uploadedFiles.length }} file(s) successfully.</h2>
        <p>
          <a href="javascript:void(0)" >Upload again</a>
        </p>
        <ul class="list-unstyled">
          <li *ngFor="let item of uploadedFiles">
            <img :src="item.url" class="img-responsive img-thumbnail" :alt="item.originalName">
          </li>
        </ul>
      </div>
      <!--FAILED-->
      <div class="margin-20" v-if="isFailed">
        <h2>Uploaded failed.</h2>
        <p>
          <a href="javascript:void(0)" >Try again</a>
        </p>
        <!--<pre>{{ uploadError | json }}</pre>-->
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'app',
    mounted() {

    },
    computed: {
      isInitial() {
        return this.currentStatus === this.STATUS_INITIAL;
      },
      isSaving() {
        return this.currentStatus === this.STATUS_SAVING;
      },
      isSuccess() {
        return this.currentStatus === this.STATUS_SUCCESS;
      },
      isFailed() {
        return this.currentStatus === this.STATUS_FAILED;
      }
    },
    methods: {
      reset() {
        this.currentStatus = this.STATUS_INITIAL;
        this.uploadedFiles = [];
        this.uploadError = null;
      },
      save(formData) {
        // upload data to the server
        this.currentStatus = this.STATUS_SAVING;
      },
      filesChange(fieldName, fileList) {
        // handle file changes
        const formData = new FormData();

        if (!fileList.length) return;

        // append the files to FormData
        Array
          .from(Array(fileList.length).keys())
          .map(x => {
            formData.append(fieldName, fileList[x], fileList[x].name);
          });

        // save it
        this.save(formData);
      }
    },
    data() {
      return {
        // status
        STATUS_INITIAL: 0,
        STATUS_SAVING: 1,
        STATUS_SUCCESS: 2,
        STATUS_FAILED: 3,

        uploadedFiles: [],
        uploadError: null,
        currentStatus: null,
        uploadFieldName: 'photos'
      }
    }
  }

</script>

<style lang="scss">
  .dropbox {
    outline: 2px dashed grey;
    /* the dash box */
    outline-offset: -10px;
    background: lightcyan;
    color: dimgray;
    padding: 10px 10px;
    min-height: 200px;
    /* minimum height */
    position: relative;
    cursor: pointer;
  }
  
  .input-file {
    opacity: 0;
    /* invisible but it's there! */
    width: 100%;
    height: 200px;
    position: absolute;
    cursor: pointer;
  }
  
  .dropbox:hover {
    background: lightblue;
    /* when mouse over to the drop zone, change color */
  }
  
  .dropbox p {
    font-size: 1.2em;
    text-align: center;
    padding: 50px 0;
  }
</style>