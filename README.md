# CV Shield 🛡️

**CV'lerdeki gizli saldırıları tespit eden AI destekli güvenlik tarayıcısı.**

🔗 **[https://no-cheats-cv.vercel.app/](https://no-cheats-cv.vercel.app/)**

---

## Ne İşe Yarar?

İşe alım süreçlerinde bazı adaylar, AI tabanlı CV tarama sistemlerini kandırmak için çeşitli hileli yöntemler kullanır. CV Shield, yüklenen CV dosyalarını analiz ederek bu tür manipülasyon girişimlerini otomatik olarak tespit eder.

Tespit edilen saldırı türleri:

- **Beyaz Metin Saldırısı** — Beyaz arka plan üzerine beyaz renkte gizlenmiş anahtar kelimeler
- **Anahtar Kelime Doldurmak** — Anlamsız biçimde tekrarlanan kelime yığınları
- **Prompt Injection** — AI tarayıcılara yönelik manipülatif talimatlar
- **Unicode Manipülasyonu** — Görünmez karakterler, sağdan sola yazım hileleri
- **Obfüskasyon** — Şifrelenmiş veya gizlenmiş metinler

---

## Nasıl Kullanılır?

Kullanımı son derece basittir — herhangi bir kayıt veya kurulum gerekmez.

1. **[Siteye git](https://no-cheats-cv.vercel.app/)**
2. **CV dosyasını yükle** — PDF formatında, sürükle-bırak veya dosya seç
3. **Sonucu bekle** — Analiz birkaç saniye içinde tamamlanır
4. **Raporu incele** — Temiz, şüpheli veya saldırı tespit edildi şeklinde sonuç görürsün

---

## Analiz Raporu

Her taramadan sonra aşağıdaki bilgileri içeren bir rapor sunulur:

| Alan | Açıklama |
|------|----------|
| **Karar** | Temiz / Şüpheli / Saldırı Tespit Edildi |
| **Güven Skoru** | Analizin güvenilirlik oranı |
| **Tespit Edilen Tehditler** | Varsa bulunan saldırılar ve şiddet seviyeleri |

---

## Örnek CV'ler

Reponun kök dizininde test amaçlı örnek CV dosyaları bulunmaktadır. Bu dosyaları siteye yükleyerek farklı saldırı türlerinin nasıl tespit edildiğini bizzat deneyimleyebilirsiniz.

---

## Dosya Gereksinimleri

- **Format:** Yalnızca PDF
- **Maksimum boyut:** 5 MB
- **Not:** Görsel tabanlı (taranmış) PDF'ler okunamaz; metin içeren PDF olmalıdır

---

## Gizlilik

Yüklenen CV dosyaları **sunucuda saklanmaz**. Analiz tamamlandıktan sonra dosya silinir.

---

*CV Shield — Powered by Google Gemini AI*
