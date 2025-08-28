'use client';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

const formSchema = z.object({
  title: z.string().min(1, { message: 'Title is required' }),
  price: z.number().positive({ message: 'Price must be a positive number' }),
  description: z.string().min(10, { message: 'Description must be at least 10 characters' }),
  category: z.string().min(1, { message: 'Category is required' }),
  image: z.string().url({ message: 'Image must be a valid URL' }),
});

type FormData = z.infer<typeof formSchema>;

export default function AddProductForm() {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = (data: FormData) => {
    console.log('Simulated product added:', data);
    alert('Product added successfully (simulated)');
    reset();
  };

  const categories = ["men's clothing", "women's clothing", "jewelery", "electronics"];

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">Add New Product (Demo)</h2>
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Title *</label>
            <input
              {...register('title')}
              className="w-full px-3 py-2 border border-gray-300 text-black rounded focus:ring-2 focus:ring-slate-500 focus:border-transparent"
              placeholder="Product title"
            />
            {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title.message}</p>}
          </div>

          {/* Price */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Price (₹) *</label>
            <input
              type="number"
              step="0.01"
              {...register('price', { valueAsNumber: true })}
              className="w-full px-3 py-2 border border-gray-300 text-black rounded focus:ring-2 focus:ring-slate-500 focus:border-transparent"
              placeholder="0.00"
            />
            {errors.price && <p className="text-red-500 text-xs mt-1">{errors.price.message}</p>}
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Category *</label>
            <select
              {...register('category')}
              className="w-full px-3 py-2 border border-gray-300 rounded text-black focus:ring-2 focus:ring-slate-500 focus:border-transparent"
            >
              <option value="">Select category</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category.replace("'s", "s")}
                </option>
              ))}
            </select>
            {errors.category && <p className="text-red-500 text-xs mt-1">{errors.category.message}</p>}
          </div>

          {/* Image URL */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Image URL *</label>
            <input
              {...register('image')}
              className="w-full px-3 py-2 border border-gray-300 rounded text-black focus:ring-2 focus:ring-slate-500 focus:border-transparent"
              placeholder="https://example.com/image.jpg"
            />
            {errors.image && <p className="text-red-500 text-xs mt-1">{errors.image.message}</p>}
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Description *</label>
          <textarea
            {...register('description')}
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded text-black focus:ring-2 focus:ring-slate-500 focus:border-transparent resize-none"
            placeholder="Product description (minimum 10 characters)"
          />
          {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description.message}</p>}
        </div>

        <button
          type="submit"
          className="bg-slate-600 hover:bg-slate-700 text-white font-medium px-6 py-2 rounded transition-colors"
        >
          Add Product
        </button>
      </form>
    </div>
  );
}