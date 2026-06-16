import { describe, it, expect, vi, beforeEach } from 'vitest';
import { backgroundImage, imageUrlToBase64, dataURLtoFile, isFileAccepted } from '../src/runtime/utils';

describe('utils', () => {
    describe('backgroundImage', () => {
        it('should set background image on element', async () => {
            const mockFile = new File(['test'], 'test.jpg', { type: 'image/jpeg' });
            const mockElement = { style: { backgroundImage: '' } };
            
            backgroundImage(mockFile, mockElement as any);
            
            // Wait for FileReader to complete
            await new Promise(resolve => setTimeout(resolve, 100));
            
            expect(mockElement.style.backgroundImage).toContain('url(');
        });

        it('should return early if file is null', () => {
            const mockElement = { style: { backgroundImage: '' } };
            
            backgroundImage(null, mockElement as any);
            
            expect(mockElement.style.backgroundImage).toBe('');
        });
    });

    describe('imageUrlToBase64', () => {
        it('should convert image URL to base64', async () => {
            // Mock fetch
            global.fetch = vi.fn(() =>
                Promise.resolve({
                    blob: () => Promise.resolve(new Blob(['test'], { type: 'image/jpeg' }))
                } as Response)
            );

            const result = await imageUrlToBase64('https://example.com/image.jpg');
            
            expect(result).toContain('data:');
            expect(result).toContain('base64');
            
            vi.restoreAllMocks();
        });

        it('should throw error on fetch failure', async () => {
            global.fetch = vi.fn(() => Promise.reject(new Error('Network error')));

            await expect(imageUrlToBase64('https://example.com/image.jpg')).rejects.toThrow();
            
            vi.restoreAllMocks();
        });
    });

    describe('dataURLtoFile', () => {
        it('should convert data URL to File', () => {
            const dataURL = 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAYABgAAD/2wBD';
            const filename = 'test.jpg';
            
            const file = dataURLtoFile(dataURL, filename);
            
            expect(file).toBeInstanceOf(File);
            expect(file.name).toBe(filename);
            expect(file.type).toBe('image/jpeg');
        });

        it('should handle different MIME types', () => {
            const pngDataURL = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg==';
            const filename = 'test.png';
            
            const file = dataURLtoFile(pngDataURL, filename);
            
            expect(file.type).toBe('image/png');
        });

        it('should handle data URL without MIME type', () => {
            const dataURL = 'data:text/plain;base64,SGVsbG8sIFdvcmxkIQ==';
            const filename = 'test.txt';
            
            const file = dataURLtoFile(dataURL, filename);
            
            expect(file.name).toBe(filename);
        });
    });

    describe('isFileAccepted', () => {
        it('should accept file when accept is empty', () => {
            const file = new File(['test'], 'test.jpg', { type: 'image/jpeg' });
            
            expect(isFileAccepted(file, '')).toBe(true);
        });

        it('should accept file by MIME type', () => {
            const file = new File(['test'], 'test.jpg', { type: 'image/jpeg' });
            
            expect(isFileAccepted(file, 'image/jpeg')).toBe(true);
            expect(isFileAccepted(file, 'image/*')).toBe(true);
        });

        it('should accept file by extension', () => {
            const file = new File(['test'], 'test.jpg', { type: 'image/jpeg' });
            
            expect(isFileAccepted(file, '.jpg')).toBe(true);
            expect(isFileAccepted(file, '.png')).toBe(false);
        });

        it('should handle array of accepted types', () => {
            const file = new File(['test'], 'test.jpg', { type: 'image/jpeg' });
            
            expect(isFileAccepted(file, ['image/jpeg', 'image/png'])).toBe(true);
            expect(isFileAccepted(file, ['.jpg', '.png'])).toBe(true);
            expect(isFileAccepted(file, ['.png', '.gif'])).toBe(false);
        });

        it('should handle comma-separated string', () => {
            const file = new File(['test'], 'test.jpg', { type: 'image/jpeg' });
            
            expect(isFileAccepted(file, 'image/jpeg, image/png')).toBe(true);
            expect(isFileAccepted(file, '.jpg, .png')).toBe(true);
        });

        it('should reject file with different MIME type', () => {
            const file = new File(['test'], 'test.jpg', { type: 'image/jpeg' });
            
            expect(isFileAccepted(file, 'application/pdf')).toBe(false);
        });
    });
});
