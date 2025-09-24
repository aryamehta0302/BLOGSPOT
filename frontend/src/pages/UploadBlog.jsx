

export default function UploadBlog() {
  return (
    <div className="upload-blog">
      <h2>Upload Blog</h2>
      <form>
        <input type="text" placeholder="Title" required />
        <input type="text" placeholder="Author" required />
        <textarea placeholder="Content" rows="6" required></textarea>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}