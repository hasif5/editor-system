# PDF Editor System Documentation

## Overview

This is a comprehensive PDF editor system built with Next.js, React, TypeScript, and Tailwind CSS. The application allows users to create, edit, and export interactive PDF documents with questions, multiple choice answers, and custom content sections.

## Features

### Core Functionality
- **Editable Content**: All text sections are fully editable using react-contenteditable
- **Question Management**: Add, edit, and remove questions dynamically
- **MCQ Support**: Multiple choice questions with customizable options
- **PDF Export**: High-quality PDF generation using html2canvas and jsPDF
- **Real-time Preview**: Live preview of the document as you edit

### Content Types Supported
- Document titles and subtitles
- Questions with numbered sequence
- Multiple choice answers (A, B, C, D format)
- Additional instructions and notes
- Custom formatting and styling

## Technical Implementation

### Dependencies Used
- **react-contenteditable**: For inline text editing functionality
- **html2canvas**: For converting HTML content to canvas for PDF generation
- **jsPDF**: For creating and exporting PDF documents
- **Next.js 15**: React framework with App Router
- **TypeScript**: For type safety and better development experience
- **Tailwind CSS**: For styling and responsive design

### Key Components

#### PDFEditor (`src/app/components/PDFEditor.tsx`)
The main component that orchestrates the entire editing experience:

- **State Management**: Manages document title, subtitle, and questions array
- **Content Editing**: Handles real-time content updates
- **PDF Export**: Converts the document to PDF format
- **Question Management**: Add/remove questions functionality

#### Type Definitions (`src/app/types/react-contenteditable.d.ts`)
Custom TypeScript declarations for the react-contenteditable library.

## Usage Guide

### Getting Started
1. The application loads with sample questions pre-populated
2. Click on any text area to start editing content inline
3. Use the "Add Question" button to create new questions
4. Click the "×" button on any question to remove it
5. Use "Download PDF" to export your document

### Editing Content
- **Document Title**: Edit the main title in the header controls or directly in the preview
- **Subtitle**: Modify the subtitle for additional context
- **Questions**: Click on question text to edit inline
- **MCQ Options**: Edit each choice by clicking on the option text
- **Footer Notes**: Add additional instructions in the footer area

### PDF Export Process
1. Click "Download PDF" button
2. The system captures the preview area using html2canvas
3. Converts the canvas to PDF using jsPDF
4. Handles multi-page documents automatically
5. Downloads with filename based on document title

## File Structure

```
src/
├── app/
│   ├── components/
│   │   └── PDFEditor.tsx          # Main editor component
│   ├── types/
│   │   └── react-contenteditable.d.ts  # Type definitions
│   ├── page.tsx                   # Home page
│   ├── layout.tsx                 # App layout
│   └── globals.css                # Global styles
docs/
└── PDF_EDITOR_GUIDE.md           # This documentation
```

## Development

### Running the Application
```bash
npm run dev
```

### Building for Production
```bash
npm run build
npm start
```

### Adding New Features
1. Update the `QuestionData` interface for new question types
2. Modify the `PDFEditor` component for new functionality
3. Add corresponding UI elements in the preview section
4. Test PDF export functionality

## Styling Guidelines

The application uses Tailwind CSS with a clean, professional design:
- **Color Scheme**: Blue accents with gray neutrals
- **Layout**: Centered max-width container with proper spacing
- **Typography**: Clear hierarchy with different font sizes
- **Interactive Elements**: Hover states and focus indicators
- **Responsive Design**: Works on desktop and tablet devices

## Browser Support

- Modern browsers with ES6+ support
- Chrome, Firefox, Safari, Edge
- Canvas and Blob support required for PDF generation

## Known Limitations

1. **Large Documents**: Very large documents may hit browser memory limits
2. **Complex Styling**: Advanced CSS features may not render perfectly in PDF
3. **Image Handling**: External images require CORS compliance
4. **Mobile Experience**: Optimized for desktop/tablet use

## Future Enhancements

- Image upload and embedding
- Table support
- Mathematical equation editing
- Collaborative editing
- Template library
- Advanced formatting options
- Drag-and-drop question reordering

## Troubleshooting

### Common Issues

**PDF Generation Fails**
- Check browser console for errors
- Ensure no blocked external resources
- Try with simpler content first

**Content Not Saving**
- Verify all ContentEditable components have proper onChange handlers
- Check React state updates in developer tools

**Styling Issues in PDF**
- Test with different browsers
- Simplify CSS if export fails
- Check for unsupported CSS properties

## Support

For technical issues or feature requests, refer to the project repository or contact the development team.
