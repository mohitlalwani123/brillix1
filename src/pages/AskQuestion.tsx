import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Plus, X, Eye, Code, Bold, Italic, Link as LinkIcon, List } from "lucide-react";

const AskQuestion = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    tags: [],
    category: "",
    difficulty: "beginner",
  });
  const [currentTag, setCurrentTag] = useState("");
  const [preview, setPreview] = useState(false);
  const [errors, setErrors] = useState({});

  const categories = [
    "javascript",
    "react",
    "python",
    "nodejs",
    "css",
    "typescript",
    "database",
    "api",
    "mobile",
    "other",
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ""
      }));
    }
  };

  const addTag = () => {
    if (currentTag.trim() && !formData.tags.includes(currentTag.trim()) && formData.tags.length < 5) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, currentTag.trim().toLowerCase()]
      }));
      setCurrentTag("");
    }
  };

  const removeTag = (tagToRemove) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      addTag();
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = "Title is required";
    } else if (formData.title.length < 10) {
      newErrors.title = "Title must be at least 10 characters";
    }

    if (!formData.content.trim()) {
      newErrors.content = "Question content is required";
    } else if (formData.content.length < 30) {
      newErrors.content = "Content must be at least 30 characters";
    }

    if (!formData.category) {
      newErrors.category = "Please select a category";
    }

    if (formData.tags.length === 0) {
      newErrors.tags = "Add at least one tag";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      // Here you would typically send the data to your backend
      console.log("Question submitted:", formData);
      
      // Simulate successful submission
      alert("Question posted successfully!");
      navigate("/questions");
    }
  };

  const insertMarkdown = (syntax) => {
    const textarea = document.getElementById("content");
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = textarea.value.substring(start, end);
    
    let replacement = "";
    switch (syntax) {
      case "bold":
        replacement = `**${selectedText || "bold text"}**`;
        break;
      case "italic":
        replacement = `*${selectedText || "italic text"}*`;
        break;
      case "code":
        replacement = `\`${selectedText || "code"}\``;
        break;
      case "link":
        replacement = `[${selectedText || "link text"}](url)`;
        break;
      case "list":
        replacement = `\n- ${selectedText || "list item"}`;
        break;
      default:
        replacement = selectedText;
    }

    const newContent = 
      textarea.value.substring(0, start) + 
      replacement + 
      textarea.value.substring(end);
    
    setFormData(prev => ({ ...prev, content: newContent }));
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Ask a Question</h1>
          <p className="text-gray-600 mt-2">
            Get help from the community by asking a clear, detailed question
          </p>
        </div>

        {/* Tips Card */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
          <h3 className="text-lg font-semibold text-blue-900 mb-3">
            Tips for asking a great question:
          </h3>
          <ul className="space-y-2 text-blue-800">
            <li>• Be specific and clear in your title</li>
            <li>• Provide context and what you've already tried</li>
            <li>• Include relevant code snippets or error messages</li>
            <li>• Add appropriate tags to help others find your question</li>
            <li>• Be respectful and follow community guidelines</li>
          </ul>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Title */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <label className="block text-lg font-semibold text-gray-900 mb-3">
              Question Title *
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              placeholder="e.g., How to implement authentication in React?"
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                errors.title ? "border-red-300" : "border-gray-300"
              }`}
            />
            {errors.title && (
              <p className="mt-2 text-sm text-red-600">{errors.title}</p>
            )}
            <p className="mt-2 text-sm text-gray-500">
              Be specific and imagine you're asking a question to another person
            </p>
          </div>

          {/* Category and Difficulty */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-lg font-semibold text-gray-900 mb-3">
                  Category *
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                    errors.category ? "border-red-300" : "border-gray-300"
                  }`}
                >
                  <option value="">Select a category</option>
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category.charAt(0).toUpperCase() + category.slice(1)}
                    </option>
                  ))}
                </select>
                {errors.category && (
                  <p className="mt-2 text-sm text-red-600">{errors.category}</p>
                )}
              </div>

              <div>
                <label className="block text-lg font-semibold text-gray-900 mb-3">
                  Difficulty Level
                </label>
                <select
                  name="difficulty"
                  value={formData.difficulty}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                >
                  <option value="beginner">Beginner</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="advanced">Advanced</option>
                </select>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between mb-3">
              <label className="block text-lg font-semibold text-gray-900">
                Question Details *
              </label>
              <div className="flex items-center space-x-2">
                <button
                  type="button"
                  onClick={() => setPreview(!preview)}
                  className="flex items-center px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition-colors"
                >
                  <Eye className="h-4 w-4 mr-1" />
                  {preview ? "Edit" : "Preview"}
                </button>
              </div>
            </div>

            {!preview && (
              <>
                {/* Markdown Toolbar */}
                <div className="flex items-center space-x-2 mb-3 p-2 bg-gray-50 rounded border">
                  <button
                    type="button"
                    onClick={() => insertMarkdown("bold")}
                    className="p-2 hover:bg-gray-200 rounded"
                    title="Bold"
                  >
                    <Bold className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => insertMarkdown("italic")}
                    className="p-2 hover:bg-gray-200 rounded"
                    title="Italic"
                  >
                    <Italic className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => insertMarkdown("code")}
                    className="p-2 hover:bg-gray-200 rounded"
                    title="Code"
                  >
                    <Code className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => insertMarkdown("link")}
                    className="p-2 hover:bg-gray-200 rounded"
                    title="Link"
                  >
                    <LinkIcon className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => insertMarkdown("list")}
                    className="p-2 hover:bg-gray-200 rounded"
                    title="List"
                  >
                    <List className="h-4 w-4" />
                  </button>
                </div>

                <textarea
                  id="content"
                  name="content"
                  value={formData.content}
                  onChange={handleInputChange}
                  rows={12}
                  placeholder="Describe your problem in detail. Include what you've tried and any error messages you're seeing..."
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors resize-none ${
                    errors.content ? "border-red-300" : "border-gray-300"
                  }`}
                />
              </>
            )}

            {preview && (
              <div className="border border-gray-300 rounded-lg p-4 min-h-[300px] bg-gray-50">
                <div className="prose max-w-none">
                  {formData.content ? (
                    <div className="whitespace-pre-wrap">{formData.content}</div>
                  ) : (
                    <p className="text-gray-500 italic">Nothing to preview yet...</p>
                  )}
                </div>
              </div>
            )}

            {errors.content && (
              <p className="mt-2 text-sm text-red-600">{errors.content}</p>
            )}
            <p className="mt-2 text-sm text-gray-500">
              Use markdown for formatting. Include code snippets, error messages, and what you've already tried.
            </p>
          </div>

          {/* Tags */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <label className="block text-lg font-semibold text-gray-900 mb-3">
              Tags * (up to 5)
            </label>
            
            <div className="flex flex-wrap gap-2 mb-3">
              {formData.tags.map((tag, index) => (
                <span
                  key={index}
                  className="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full"
                >
                  {tag}
                  <button
                    type="button"
                    onClick={() => removeTag(tag)}
                    className="ml-2 hover:text-blue-600"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </span>
              ))}
            </div>

            <div className="flex space-x-2">
              <input
                type="text"
                value={currentTag}
                onChange={(e) => setCurrentTag(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Add a tag (press Enter or comma)"
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                disabled={formData.tags.length >= 5}
              />
              <button
                type="button"
                onClick={addTag}
                disabled={!currentTag.trim() || formData.tags.length >= 5}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>

            {errors.tags && (
              <p className="mt-2 text-sm text-red-600">{errors.tags}</p>
            )}
            <p className="mt-2 text-sm text-gray-500">
              Add tags to help others find your question. Use existing tags when possible.
            </p>
          </div>

          {/* Submit */}
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={() => navigate("/questions")}
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:opacity-90 transition-opacity"
            >
              Post Question
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AskQuestion;