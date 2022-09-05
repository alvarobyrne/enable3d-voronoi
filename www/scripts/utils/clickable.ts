export default (href: string) => {
  const clickable: HTMLAnchorElement = document.createElement("a");
  clickable.target = "_blank";
  clickable.href = href;
  clickable.click();
};
