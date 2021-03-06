# preload.js
Yet another short and simple script to preload pretty much everything you can think of.

Very simple to use:

```html
<script>
preloader.load([
  'path/to/file.png',
  'path/to/audio.mp3',
  'etc/etc/png'
]);
</script>
```

So far only audio and images can be loaded. a new loader can be added easily.
Start by creating the loader itself:
```html
<script>
preloader.loader.video = function(url, callback){
  //i havent worked much with video, there's probably a better way to do this.
  var video = document.createElement('video');
  var source = document.createElement('source');
  
  video.addEventListener('canplaythrough', function(){
    //i tried methods to ommit this event listener, without success, every loader must have an event listener to execute the callback
    callback(video, 'video')
  });
  
  video.appendChild(source);
  source.src = url;
}
</script>
```

Next up is defining what extensions should use this loader:
```html
</script>
preloader.extensions.video = ['mp4', 'ogv'];
</script>
```

Another thing that might be interesting to know is it emits events as well, 'loaderprogress' and 'loadcomplete'.
```html
<script>
  document.addEventListener('loaderprogress', function(e){
    console.log('New file loaded: ' + e.file);
  });
</script>
```

The preloader also keeps track of loaded files and percentage loaded in preloader.data 

And that just about covers it.
