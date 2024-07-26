// 찜 목록을 저장할 배열
let wishlist = [];

// 찜 목록에서 항목 추가 또는 삭제를 토글하는 함수
function toggleLike(element) {
  // 부모 <li> 요소를 찾습니다.
  const movieElement = element.closest(".movie");
  if (!movieElement) {
    console.error("Parent <li> element not found");
    return;
  }

  // 각 항목의 고유 ID를 가져옵니다.
  const itemId = movieElement.dataset.id;
  if (!itemId) {
    console.error("Item ID not found");
    return;
  }

  // 찜 목록에 해당 항목이 있는지 확인합니다.
  const index = wishlist.findIndex((item) => item.id === itemId);

  if (index === -1) {
    // 찜 목록에 없으면 추가합니다.
    const itemElement = movieElement.cloneNode(true); // 요소를 복사합니다.
    wishlist.push({ id: itemId, element: itemElement });

    // 하트 아이콘을 채워진 하트로 설정합니다.
    const heartIcon = element.querySelector("i");
    if (heartIcon) {
      heartIcon.classList.remove("fa-regular", "fa-heart");
      heartIcon.classList.add("fa-solid", "fa-heart");
    }

    // 해당 항목의 인덱스 하트 아이콘도 찾아서 변경합니다.
    const indexHeartIcons = document.querySelectorAll(
      `#section1 li[data-id="${itemId}"] i, #section2 li[data-id="${itemId}"] i, #searchResult li[data-id="${itemId}"] i`
    );
    if (indexHeartIcons) {
      indexHeartIcons.forEach((icon) => {
        icon.classList.remove("fa-regular", "fa-heart");
        icon.classList.add("fa-solid", "fa-heart");
      });
    }
  } else {
    // 찜 목록에 이미 있으면 삭제합니다.
    wishlist.splice(index, 1);

    // 하트 아이콘을 빈 하트로 설정합니다.
    const heartIcon = element.querySelector("i");
    if (heartIcon) {
      heartIcon.classList.remove("fa-solid", "fa-heart");
      heartIcon.classList.add("fa-regular", "fa-heart");
    }

    // 해당 항목의 인덱스 하트 아이콘도 찾아서 변경합니다.
    const indexHeartIcons = document.querySelectorAll(
      `#section1 li[data-id="${itemId}"] i, #section2 li[data-id="${itemId}"] i, #searchResult li[data-id="${itemId}"] i`
    );
    if (indexHeartIcons) {
      indexHeartIcons.forEach((icon) => {
        icon.classList.remove("fa-solid", "fa-heart");
        icon.classList.add("fa-regular", "fa-heart");
      });
    }
  }

  // 찜 목록을 업데이트합니다.
  updateWishlist();
}

// 찜 목록을 업데이트하는 함수
function updateWishlist() {
  const wishlistItems = document.getElementById("wishlistItems");
  wishlistItems.innerHTML = ""; // 목록을 비웁니다.

  // 각 항목을 순회하면서 목록에 추가합니다.
  wishlist.forEach((item) => {
    const li = item.element.cloneNode(true); // 요소를 복사합니다.
    li.classList.add("wishlist-item"); // 클래스를 추가합니다.

    // 하트 아이콘을 채워진 하트로 설정합니다.
    const heartIcon = li.querySelector("i");
    if (heartIcon) {
      heartIcon.classList.remove("fa-regular", "fa-heart");
      heartIcon.classList.add("fa-solid", "fa-heart");
    }

    // 삭제 버튼에 클릭 이벤트를 추가합니다.
    li.addEventListener("click", () => {
      removeItem(item.id);
    });

    wishlistItems.appendChild(li); // li 요소를 찜 목록에 추가합니다.
  });
}

// 찜 목록에서 항목 삭제하는 함수
function removeItem(itemId) {
  // 항목을 ID를 기준으로 찾아서 삭제합니다.
  wishlist = wishlist.filter((item) => item.id !== itemId);

  // 해당 항목의 인덱스 하트 아이콘을 찾아서 색상을 변경합니다.
  const indexHeartIcons = document.querySelectorAll(
    `#section1 li[data-id="${itemId}"] i, #section2 li[data-id="${itemId}"] i, #searchResult li[data-id="${itemId}"] i`
  );
  if (indexHeartIcons) {
    indexHeartIcons.forEach((icon) => {
      icon.classList.remove("fa-solid", "fa-heart");
      icon.classList.add("fa-regular", "fa-heart");
    });
  }

  // 찜 목록을 업데이트합니다.
  updateWishlist();
}
