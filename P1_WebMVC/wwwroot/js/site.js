  (function () {
    // Helpers
    function showImagePreview(imgEl, src) {
      imgEl.src = src;
      imgEl.style.display = 'block';
    }
    function hideEl(el) { el.style.display = 'none'; }
    function showEl(el) { el.style.display = 'block'; }

    // Profile preview
    const profileInput = document.getElementById('profileImageInput');
    const profilePreview = document.getElementById('profilePreview');
    if (profileInput) {
      profileInput.addEventListener('change', function (e) {
        const file = e.target.files && e.target.files[0];
        if (!file) return;
        if (!file.type.startsWith('image/')) return;
        const url = URL.createObjectURL(file);
        showImagePreview(profilePreview, url);
        // Keep main avatar in page updated visually (optional)
        const avatarImg = document.getElementById('profileAvatarImg');
        if (avatarImg) avatarImg.src = url;
        // revoke after load
        profilePreview.onload = () => URL.revokeObjectURL(url);
      });
    }

    // Post media preview (image or video)
    const postInput = document.getElementById('postMediaInput');
    const postImg = document.getElementById('postPreviewImage');
    const postVideo = document.getElementById('postPreviewVideo');
    if (postInput) {
      postInput.addEventListener('change', function (e) {
        const file = e.target.files && e.target.files[0];
        if (!file) return;

        const url = URL.createObjectURL(file);
        if (file.type.startsWith('image/')) {
          hideEl(postVideo);
          showImagePreview(postImg, url);
          postVideo.pause && postVideo.pause();
          postImg.onload = () => URL.revokeObjectURL(url);
        } else if (file.type.startsWith('video/')) {
          hideEl(postImg);
          postVideo.src = url;
          showEl(postVideo);
          postVideo.onloadeddata = () => URL.revokeObjectURL(url);
        } else {
          hideEl(postImg);
          hideEl(postVideo);
        }
      });
    }

    // Reel preview: video only
    const reelInput = document.getElementById('reelMediaInput');
    const reelVideo = document.getElementById('reelPreviewVideo');
    if (reelInput) {
      reelInput.addEventListener('change', function (e) {
        const file = e.target.files && e.target.files[0];
        if (!file) return;

        const url = URL.createObjectURL(file);
        if (file.type.startsWith('video/')) {
          reelVideo.src = url;
          showEl(reelVideo);
          reelVideo.onloadeddata = () => URL.revokeObjectURL(url);
        } else {
          reelVideo.pause && reelVideo.pause();
          reelVideo.src = '';
          hideEl(reelVideo);
        }
      });
    }
  })();