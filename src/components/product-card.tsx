'use client'

import { z } from 'zod'
import { Truck } from 'lucide-react'
import Image from 'next/image'
import { Button } from './ui/button'
import { Input } from './ui/input'
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from './ui/dialog'
import type { Product } from '@/entities/Product'
import { useForm } from 'react-hook-form'
import { buyProductFn, type BuyProductRequest } from '@/api/buy-product'
import { useRouter } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'
import { motion, AnimatePresence } from 'motion/react'

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const router = useRouter()

  const purchaseSchema = z.object({
    name: z
      .string()
      .min(3, { message: 'Nome deve ter pelo menos 3 caracteres' }),
    email: z.string().email({ message: 'Email inválido' }),
    phone_number: z
      .string()
      .min(10, { message: 'Telefone deve ter pelo menos 10 dígitos' }),
    street_number: z.coerce
      .number()
      .min(1, { message: 'Número da rua é obrigatório' }),
    street: z
      .string()
      .min(3, { message: 'Rua deve ter pelo menos 3 caracteres' }),
    district: z
      .string()
      .min(3, { message: 'Bairro deve ter pelo menos 3 caracteres' }),
    city: z.string().min(2, { message: 'Cidade é obrigatória' }),
    state: z.string().min(2, { message: 'Estado é obrigatório' }),
  })

  type PurchaseSchema = z.infer<typeof purchaseSchema>

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PurchaseSchema>({
    resolver: zodResolver(purchaseSchema),
  })

  async function buyProduct(values: PurchaseSchema) {
    try {
      const payload: BuyProductRequest = {
        ...values,
        product_id: product.product_id,
      }

      await buyProductFn(payload)

      router.push('/thank-you')
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div className="flex flex-col p-6 bg-white rounded-2xl shadow-lg border border-gray-200 hover:shadow-xl transition-shadow duration-300">
      <div className="flex flex-col items-center gap-4">
        {product.best_choice ? (
          <div className="bg-yellow-500 text-white text-sm font-semibold px-3 py-1 rounded-full">
            Melhor escolha!
          </div>
        ) : (
          <div className="mt-7" />
        )}

        <Image
          src={product.image_url}
          className="rounded-lg"
          alt={`Imagem de ${product.name}`}
          width={200}
          height={180}
          quality={100}
        />

        <div className="bg-green-600 text-white px-3 py-1 rounded-lg mt-2">
          <span className="flex items-center gap-2 text-sm">
            <Truck size={18} />
            {product.freight}*
          </span>
        </div>

        <h2 className="text-xl font-bold text-gray-800 mt-4">{product.name}</h2>

        {product.discount > 0 ? (
          <div className="flex flex-col items-center">
            <span className="text-gray-400 line-through text-lg">
              {product.price.toLocaleString('pt-BR', {
                currency: 'BRL',
                style: 'currency',
              })}
            </span>
            <span className="text-red-600 text-2xl font-semibold">
              {(product.price - product.discount).toLocaleString('pt-BR', {
                currency: 'BRL',
                style: 'currency',
              })}
            </span>
          </div>
        ) : (
          <span className="text-green-700 text-2xl font-bold mt-7">
            {product.price.toLocaleString('pt-BR', {
              currency: 'BRL',
              style: 'currency',
            })}
          </span>
        )}

        <Dialog>
          <DialogTrigger asChild>
            <Button className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg">
              Comprar
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg mx-auto">
            <DialogHeader>
              <DialogTitle className="text-center">
                Finalizar Compra
              </DialogTitle>
              <DialogDescription className="text-center">
                Preencha seus dados para concluir a compra.
              </DialogDescription>
            </DialogHeader>

            <form
              onSubmit={handleSubmit(buyProduct)}
              className="flex flex-col gap-5 mt-5"
            >
              <div>
                <Input placeholder="Nome" {...register('name')} />
                <AnimatePresence>
                  {errors.name && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.3 }}
                      className="text-red-500 mt-1 text-sm"
                    >
                      {errors.name.message}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>

              <div>
                <Input
                  type="email"
                  placeholder="Email"
                  {...register('email')}
                />
                <AnimatePresence>
                  {errors.email && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.3 }}
                      className="text-red-500 mt-1 text-sm"
                    >
                      {errors.email.message}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>

              <div>
                <Input
                  type="tel"
                  placeholder="Telefone"
                  {...register('phone_number')}
                />
                <AnimatePresence>
                  {errors.phone_number && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.3 }}
                      className="text-red-500 mt-1 text-sm"
                    >
                      {errors.phone_number.message}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>

              <div>
                <Input
                  placeholder="Número da Rua"
                  type="number"
                  {...register('street_number')}
                />
                <AnimatePresence>
                  {errors.street_number && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.3 }}
                      className="text-red-500 mt-1 text-sm"
                    >
                      {errors.street_number.message}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>

              <div>
                <Input placeholder="Rua" {...register('street')} />
                <AnimatePresence>
                  {errors.street && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.3 }}
                      className="text-red-500 mt-1 text-sm"
                    >
                      {errors.street.message}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>

              <div>
                <Input placeholder="Bairro" {...register('district')} />
                <AnimatePresence>
                  {errors.district && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.3 }}
                      className="text-red-500 mt-1 text-sm"
                    >
                      {errors.district.message}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>

              <div>
                <Input placeholder="Cidade" {...register('city')} />
                <AnimatePresence>
                  {errors.city && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.3 }}
                      className="text-red-500 mt-1 text-sm"
                    >
                      {errors.city.message}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>

              <div>
                <Input placeholder="Estado" {...register('state')} />
                <AnimatePresence>
                  {errors.state && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.3 }}
                      className="text-red-500 mt-1 text-sm"
                    >
                      {errors.state.message}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>

              <div className="flex justify-end gap-4 mt-6">
                <DialogClose asChild>
                  <Button
                    variant="outline"
                    className="bg-gray-100 hover:bg-gray-200 text-gray-700"
                  >
                    Cancelar
                  </Button>
                </DialogClose>
                <Button
                  type="submit"
                  className="bg-green-600 hover:bg-green-700 text-white"
                >
                  Confirmar
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}
