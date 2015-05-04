var preloader = {
  lib: {},

  data:{
    filesToLoad: 0,
    filesLoaded: 0,

    get filesLeft(){
      return filesToLoad - filesLoaded;
    },

    get pctLoaded(){
      return preloader.data.filesLoaded / preloader.data.filesToLoad * 100;
    }
  },

  extensions: {
    image: ['jpg', 'jpeg', 'png', 'gif', 'bmp'],
    audio: ['mp3', 'wav', 'ogg']
  },

  load: function(urls, callback){
    for(i in urls){
      var url = urls[i];
      var ext = url.split( '.' ).pop();
      preloader.data.filesToLoad++;

      for( type in preloader.extensions ){
        if( preloader.extensions[ type ].indexOf( ext ) > -1 ) {
          preloader.lib[type] = preloader.lib[type] || [];
          preloader.loaders[type]( url, function(file, type){
            preloader.data.filesLoaded++;
            preloader.lib[type].push(file);
            if(preloader.onProgress){
              preloader.onProgress();
            }
            else{
              var evt = document.createEvent('Event');
                  evt.initEvent('loaderprogress', true, true);
                  evt.file = file.src;
              document.dispatchEvent(evt);
            };
            if(preloader.data.filesToLoad == preloader.data.filesLoaded) {
              var evt = document.createEvent('Event');
                  evt.initEvent('loadcomplete', true, true);
              document.dispatchEvent(evt);
              if( callback ) callback();
            }
          });
        }
      }
    }
  },

  loaders: {
    image: function(url, callback){
      var img = new Image();
          img.addEventListener('load', function(){
            callback(img, 'image');
          }, false);
          img.src = url;
    },

    audio: function(url, callback){
      var audio = new Audio();
          audio.addEventListener('canplaythrough', function(){
            callback(audio, 'audio');
          });
          audio.src = url;
    }
  }
}
