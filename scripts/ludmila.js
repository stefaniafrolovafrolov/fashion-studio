function reloadManagedComments(page) {
  const comments = document.querySelector(".reviews__container");
  const items = fetchBackend("manage?page=" + page, { token: 1 }, false);
  items.then((item) => {
    // !!! Потенциальыне ошибки !!! нет проверки на наличие всех

    if (item.comments.length === 0 && item.selected != 1)
      return reloadCommentFunction.exec(1);
    const url = new URL(window.location.href);
    url.searchParams.set("page", item.selected);
    window.history.replaceState(null, "", url.href);
    const pages = getPages(item.pages, item.selected);
    const list = [];
    item.comments.forEach((comment) => {
      list.push(makeComment(comment, true));
    });
    comments.innerHTML = `<DIV class="reviews__container">${pages}${list.join(
      ""
    )}${pages}</DIV>`;
    const hrefs = document.querySelectorAll(".page-console-button");
    hrefs.forEach((ref) => ref.addEventListener("click", preventDefaultClick));
    queryTotalRating();
  });
}

function moveCommentToVisible(id = 0) {
  const result = fetchBackend("accept", { token: 1, id: id }, false);
  result.then((answer) => {
    const url = new URL(window.location.href);
    reloadCommentFunction.exec(url.searchParams.get("page") || 1);
  });
}

function moveCommentToTrash(id = 0) {
  const result = fetchBackend("delete", { token: 1, id: id }, false);
  result.then((answer) => {
    const url = new URL(window.location.href);
    reloadCommentFunction.exec(url.searchParams.get("page") || 1);
  });
}

function removeCommentToTrash(id = 0) {
  const result = fetchBackend("remove", { token: 1, id: id }, false);
  result.then((answer) => {
    const url = new URL(window.location.href);
    reloadCommentFunction.exec(url.searchParams.get("page") || 1);
  });
}

function getPageManagerData() {
  reloadCommentFunction.exec = reloadManagedComments;
  getPageData();
}
