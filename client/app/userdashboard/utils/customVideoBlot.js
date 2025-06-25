import Quill from "quill";

const BlockEmbed = Quill.import("blots/block/embed");

class CustomVideo extends BlockEmbed {
  static blotName = "video";
  static tagName = "iframe";
  static className = "ql-video";

  static create(value) {
    const node = super.create();
    node.setAttribute("frameborder", "0");
    node.setAttribute("allowfullscreen", true);
    node.setAttribute("width", "100%");
    node.setAttribute("height", "400");

    // Convert to embed URL
    const embedUrl = this.convertToEmbedURL(value);
    node.setAttribute("src", embedUrl);
    return node;
  }

  static value(node) {
    return node.getAttribute("src");
  }

  static convertToEmbedURL(url) {
    const ytMatch = url.match(
      /(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/
    );
    if (ytMatch && ytMatch[1]) {
      return `https://www.youtube.com/embed/${ytMatch[1]}`;
    }
    return url;
  }
}

export default CustomVideo;
