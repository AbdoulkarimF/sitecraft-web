import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import CategoryManager from '../components/blog/CategoryManager';

describe('CategoryManager Component', () => {
  const mockCategories = ['Tech', 'Design'];
  const mockTags = ['React', 'JavaScript'];
  const mockOnCategoryChange = jest.fn();
  const mockOnTagChange = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders initial categories and tags', () => {
    render(
      <CategoryManager
        initialCategories={mockCategories}
        initialTags={mockTags}
        onCategoryChange={mockOnCategoryChange}
        onTagChange={mockOnTagChange}
      />
    );

    mockCategories.forEach(category => {
      expect(screen.getByText(category)).toBeInTheDocument();
    });

    mockTags.forEach(tag => {
      expect(screen.getByText(tag)).toBeInTheDocument();
    });
  });

  test('adds new category', () => {
    render(
      <CategoryManager
        initialCategories={mockCategories}
        initialTags={mockTags}
        onCategoryChange={mockOnCategoryChange}
        onTagChange={mockOnTagChange}
      />
    );

    const input = screen.getByPlaceholderText(/nouvelle catégorie/i);
    fireEvent.change(input, { target: { value: 'New Category' } });
    fireEvent.submit(input.closest('form'));

    expect(mockOnCategoryChange).toHaveBeenCalledWith([...mockCategories, 'New Category']);
  });

  test('adds new tag', () => {
    render(
      <CategoryManager
        initialCategories={mockCategories}
        initialTags={mockTags}
        onCategoryChange={mockOnCategoryChange}
        onTagChange={mockOnTagChange}
      />
    );

    const input = screen.getByPlaceholderText(/nouveau tag/i);
    fireEvent.change(input, { target: { value: 'New Tag' } });
    fireEvent.submit(input.closest('form'));

    expect(mockOnTagChange).toHaveBeenCalledWith([...mockTags, 'New Tag']);
  });

  test('removes category', () => {
    render(
      <CategoryManager
        initialCategories={mockCategories}
        initialTags={mockTags}
        onCategoryChange={mockOnCategoryChange}
        onTagChange={mockOnTagChange}
      />
    );

    const categoryToRemove = mockCategories[0];
    const removeButton = screen.getByText(categoryToRemove).nextSibling;
    fireEvent.click(removeButton);

    expect(mockOnCategoryChange).toHaveBeenCalledWith(
      mockCategories.filter(c => c !== categoryToRemove)
    );
  });

  test('removes tag', () => {
    render(
      <CategoryManager
        initialCategories={mockCategories}
        initialTags={mockTags}
        onCategoryChange={mockOnCategoryChange}
        onTagChange={mockOnTagChange}
      />
    );

    const tagToRemove = mockTags[0];
    const removeButton = screen.getByText(tagToRemove).nextSibling;
    fireEvent.click(removeButton);

    expect(mockOnTagChange).toHaveBeenCalledWith(
      mockTags.filter(t => t !== tagToRemove)
    );
  });

  test('prevents duplicate categories', () => {
    render(
      <CategoryManager
        initialCategories={mockCategories}
        initialTags={mockTags}
        onCategoryChange={mockOnCategoryChange}
        onTagChange={mockOnTagChange}
      />
    );

    const input = screen.getByPlaceholderText(/nouvelle catégorie/i);
    fireEvent.change(input, { target: { value: mockCategories[0] } });
    fireEvent.submit(input.closest('form'));

    expect(mockOnCategoryChange).not.toHaveBeenCalled();
  });

  test('prevents duplicate tags', () => {
    render(
      <CategoryManager
        initialCategories={mockCategories}
        initialTags={mockTags}
        onCategoryChange={mockOnCategoryChange}
        onTagChange={mockOnTagChange}
      />
    );

    const input = screen.getByPlaceholderText(/nouveau tag/i);
    fireEvent.change(input, { target: { value: mockTags[0] } });
    fireEvent.submit(input.closest('form'));

    expect(mockOnTagChange).not.toHaveBeenCalled();
  });

  test('trims whitespace from new categories and tags', () => {
    render(
      <CategoryManager
        initialCategories={mockCategories}
        initialTags={mockTags}
        onCategoryChange={mockOnCategoryChange}
        onTagChange={mockOnTagChange}
      />
    );

    const categoryInput = screen.getByPlaceholderText(/nouvelle catégorie/i);
    fireEvent.change(categoryInput, { target: { value: '  New Category  ' } });
    fireEvent.submit(categoryInput.closest('form'));

    expect(mockOnCategoryChange).toHaveBeenCalledWith([...mockCategories, 'New Category']);

    const tagInput = screen.getByPlaceholderText(/nouveau tag/i);
    fireEvent.change(tagInput, { target: { value: '  New Tag  ' } });
    fireEvent.submit(tagInput.closest('form'));

    expect(mockOnTagChange).toHaveBeenCalledWith([...mockTags, 'New Tag']);
  });
});
