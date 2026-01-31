document.addEventListener('alpine:init', () => {
    Alpine.data('products', () => ({
        items: [
            { id: 1, name: 'Free Range Chicken', img: '../../image/Produk1.jpg', price: 35000 },
            { id: 2, name: 'New Zealand Beef', img: '../../image/Produk2.png', price: 25000 },
            { id: 3, name: 'New Zealand Beef, Orange', img: '../../image/Produk3.jpg', price: 30000 },
            { id: 4, name: 'Free Range Chicken', img: '../../image/Produk4.jpg', price: 25000 },
            { id: 5, name: 'Wild Alaskan Salmon Mini Stick', img: '../../image/Produk5.jpg', price: 20000 },
            { id: 6, name: 'Wild Alaskan Salmon Soft Bite', img: '../../image/Produk6.jpg', price: 30000 },
        ],
    }));

    Alpine.store('cart', {
        items: [],
        total: 0,
        quantity: 0,
        add(newItem) {
            // cek apakah ada barang yang sama di cart
            const cartItem = this.items.find((item) => item.id === newItem.id);

            // jika belum ada / cart masih kosong
            if (!cartItem) {
                this.items.push({ ...newItem, quantity: 1, total: newItem.price });
                this.quantity++;
                this.total += newItem.price;
            } else {
                // jika barang sudah AudioData, cek apakah barang beda atau sama dengan yang ada di cart
                this.items = this.items.map((item) => {
                    // jika barang berbeda
                    if (item.id !== newItem.id) {
                        return item;
                    } else {
                        // jika barang sudah ada, tambah quantity dan totalnya
                        item.quantity++;
                        item.total = item.price * item.quantity;
                        this.quantity++;
                        this.total += item.price;
                        return item;
                    }
                });
            }
        },
        remove(id) {
            // ambil item yang mau diremove berdasarkan id nya
            const cartItem = this.items.find((item) => item.id == id);

            // jika item lebih dari 1
            if (cartItem.quantity > 1) {
                // telusuri 1 1
                this.items = this.items.map((item) => {
                    // jika bukan barang yang di klik
                    if (item.id !== id) {
                        return item;
                    } else {
                        item.quantity--;
                        item.total = item.price * item.quantity;
                        this.quantity--;
                        this.total -= item.price;
                        return item;
                    }
                });
            } else if (cartItem.quantity === 1) {
                // jika barangnya sisa 1
                this.items = this.items.filter((item) => item.id !== id);
                this.quantity--;
                this.total -= cartItem.price;
            }
        },
    });
});

// Form Validation
const checkoutButton = document.querySelector('.checkout-button');
checkoutButton.disabled = true;

const form = document.querySelector('#checkoutForm');

form.addEventListener('keyup', function () {
    for (let i = 0; i < form.elements.length; i++) {
        if (form.elements[i].value.length !== 0) {
            checkoutButton.classList.remove('disabled');
            checkoutButton.classList.add('disabled');
        } else {
            return false;
        }
    }
    checkoutButton.disabled = false;
    checkoutButton.classList.remove('disabled');
});

// Kirim data ketika tombol checkout diklik
checkoutButton.addEventListener('click', async function (e) {
    e.preventDefault();
    const formData = new FormData(form);
    const data = new URLSearchParams(formData);
    const objData = Object.fromEntries(data);
    // const message = formatMessage(objData);
    // window.open('http://wa.me/6282110186527?text=' + encodeURIComponent(message));

    // Minta Transaction token menggunakan ajax / fetch
    try {
        const response = await fetch('../../php/placeOrder.php', {
            method: 'POST',
            body: data,
        });
        const token = await response.text();
        // console.log(token);
        window.snap.pay(token, {
            onSuccess: function (result) {
                alert(
                    "✅ Pembayaran Berhasil!\n\n" +
                    "Order ID: " + result.order_id + "\n" +
                    "Total: " + rupiah(result.gross_amount) + "\n\n" +
                    "Terima kasih atas pesanan Anda!"
                );
            },
            onPending: function (result) {
                alert(
                    "⏳ Menunggu Pembayaran\n\n" +
                    "Order ID: " + result.order_id + "\n" +
                    "Total: " + rupiah(result.gross_amount) + "\n\n" +
                    "Silakan selesaikan pembayaran Anda."
                );
            },
            onError: function (result) {
                alert(
                    "❌ Pembayaran Gagal\n\n" +
                    "Terjadi kesalahan saat memproses transaksi.\n" +
                    "Silakan coba lagi nanti."
                );
            },
            onClose: function () {
                alert(
                    "⚠️ Pembayaran Dibatalkan\n\n" +
                    "Anda menutup popup sebelum menyelesaikan pembayaran."
                );
            }
        });

    } catch (err) {
        console.log(err.message);
    }
});

// Format pesan whatshapp
const formatMessage = (obj) => {
    return `Data Customer
    Nama: ${obj.name}
    Email: ${obj.email}
    No HP: ${obj.phone}
    Data Pesanan
    ${JSON.parse(obj.items).map((item) => `${item.name} (${item.quantity} x ${rupiah(item.total)}) \n`)}
    TOTAL: ${rupiah(obj.total)}
    Terima kasih.`;
};

// konversi ke Rupiah
const rupiah = (number) => {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
    }).format(number);
};