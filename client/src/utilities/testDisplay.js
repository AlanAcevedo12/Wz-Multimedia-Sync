async function onClick() {
    let track;
    await navigator.mediaDevices.getDisplayMedia()
      .then(
        async (mediaStream) => {
          console.log(mediaStream);
          track = mediaStream.getVideoTracks()[0];
          const media_processor = new window.MediaStreamTrackProcessor({ track });
          const reader = media_processor.readable.getReader();
          // console.log(reader)
          while (true) {
            const result = await reader.read();
            if (result.done) break;

            let frame = result.value;
            frame.close();

            const enconder = new VideoEncoder();
          }
        }
      )

  }

  function isSupportWebCodecs() {
    return typeof window.MediaStreamTrackProcessor === 'function'
  }
