import { columns } from '@/app/config/myFiles'
import { MyFilesDataTable } from '@/components/myFilesDataTable'

type Payment = {
  data: [
    {
      id: string
      character_count: string
      voice_name: string
      voice_speed: string
    }
  ]
}

async function getData(): Promise<Payment[]> {
  return {
    data: [
      {
        id: 2,
        documentId: 'raj06vrxv1jqmgy0gj6hgebe',
        text: 'kishanshetty',
        character_count: 100,
        voice_name: 'kishanshetty1992@gmail.com',
        voice_speed: '1.0x',
        audio_format: 'mp3',
        audio_url:
          'https://res.cloudinary.com/dc7lr03my/video/upload/v1742033901/tts_audio/dxrvqjafif5mtqk5purq.mp3',
        createdAt: '2025-03-15T10:41:24.404Z',
        updatedAt: '2025-03-15T10:41:24.404Z',
        publishedAt: '2025-03-15T10:41:24.411Z'
      },
      {
        id: 4,
        documentId: 'zw1gphp8wvn0v9jox0eg6qmu',
        text: 'kishanshetty',
        character_count: 100,
        voice_name: 'kishanshetty1992@gmail.com',
        voice_speed: '1.0x',
        audio_format: 'mp3',
        audio_url:
          'https://res.cloudinary.com/dc7lr03my/video/upload/v1742033901/tts_audio/dxrvqjafif5mtqk5purq.mp3',
        createdAt: '2025-03-15T10:52:02.304Z',
        updatedAt: '2025-03-15T10:52:02.304Z',
        publishedAt: '2025-03-15T10:52:02.316Z'
      },
      {
        id: 6,
        documentId: 'ihvukwhg2qnfboqy3bjsv2jp',
        text: 'i have 6 years of experiance',
        character_count: 28,
        voice_name: 'en-US-Wavenet-D',
        voice_speed: '1.5x',
        audio_format: 'MP3',
        audio_url:
          'https://res.cloudinary.com/dc7lr03my/video/upload/v1742036082/tts_audio/jfyof2o7decvgjuez8p7.mp3',
        createdAt: '2025-03-15T10:55:55.995Z',
        updatedAt: '2025-03-15T10:55:55.995Z',
        publishedAt: '2025-03-15T10:55:56.008Z'
      },
      {
        id: 8,
        documentId: 'sy00pas2giffynudyhp9jfr9',
        text: 'Hi hello how are you my dear friend my name is kishan b',
        character_count: 55,
        voice_name: 'en-US-Wavenet-D',
        voice_speed: '1.0x',
        audio_format: 'MP3',
        audio_url:
          'https://res.cloudinary.com/dc7lr03my/video/upload/v1742036849/tts_audio/vkmzskgs5kxmikdpqihz.mp3',
        createdAt: '2025-03-15T11:07:34.007Z',
        updatedAt: '2025-03-15T11:07:34.007Z',
        publishedAt: '2025-03-15T11:07:34.031Z'
      },
      {
        id: 10,
        documentId: 'haf33cnhchcgkjgm55kubf6q',
        text: 'Hi hello how are you my dear friend my name is kishan b and your name',
        character_count: 69,
        voice_name: 'en-US-Wavenet-D',
        voice_speed: '1.0x',
        audio_format: 'MP3',
        audio_url:
          'https://res.cloudinary.com/dc7lr03my/video/upload/v1742036974/tts_audio/rqzfmcdskpl1ixtboolk.mp3',
        createdAt: '2025-03-15T11:09:39.520Z',
        updatedAt: '2025-03-15T11:09:39.520Z',
        publishedAt: '2025-03-15T11:09:39.535Z'
      },
      {
        id: 12,
        documentId: 'prg77iygve46g80h2iboptpj',
        text: 'Both Cloudinary and next-cloudinary help manage and optimize images and videos, but they serve different purposes in a Next.js project.',
        character_count: 135,
        voice_name: 'en-US-Wavenet-D',
        voice_speed: '1.0x',
        audio_format: 'MP3',
        audio_url:
          'https://res.cloudinary.com/dc7lr03my/video/upload/v1742037078/tts_audio/ciypduymfrvk5sgm6icb.mp3',
        createdAt: '2025-03-15T11:11:22.760Z',
        updatedAt: '2025-03-15T11:11:22.760Z',
        publishedAt: '2025-03-15T11:11:22.772Z'
      },
      {
        id: 14,
        documentId: 'fncam60bypfkeymkzex53kyn',
        text: 'cxcxc',
        character_count: 5,
        voice_name: 'en-US-Wavenet-D',
        voice_speed: '1.0x',
        audio_format: 'MP3',
        audio_url:
          'https://res.cloudinary.com/dc7lr03my/video/upload/v1742117408/tts_audio/r6iwgpfrenlcqza4zp35.mp3',
        createdAt: '2025-03-16T09:30:11.004Z',
        updatedAt: '2025-03-16T09:30:11.004Z',
        publishedAt: '2025-03-16T09:30:11.073Z'
      },
      {
        id: 16,
        documentId: 'cheagc4lo22803xca0vg3r27',
        text: 'cxcxc',
        character_count: 5,
        voice_name: 'en-US-Wavenet-D',
        voice_speed: '1.0x',
        audio_format: 'MP3',
        audio_url:
          'https://res.cloudinary.com/dc7lr03my/video/upload/v1742117423/tts_audio/o1ll7s4dnkggbjneqwcc.mp3',
        createdAt: '2025-03-16T09:30:24.683Z',
        updatedAt: '2025-03-16T09:30:24.683Z',
        publishedAt: '2025-03-16T09:30:24.697Z'
      },
      {
        id: 18,
        documentId: 'c4p19qpzvj1aptv0de4y5ey5',
        text: 'cxcxc',
        character_count: 5,
        voice_name: 'en-US-Wavenet-D',
        voice_speed: '1.0x',
        audio_format: 'MP3',
        audio_url:
          'https://res.cloudinary.com/dc7lr03my/video/upload/v1742117441/tts_audio/n5ay8gbwimxbn7ouduux.mp3',
        createdAt: '2025-03-16T09:30:43.931Z',
        updatedAt: '2025-03-16T09:30:43.931Z',
        publishedAt: '2025-03-16T09:30:43.951Z'
      },
      {
        id: 20,
        documentId: 'ijls0emupj8dxle93wgyplhy',
        text: 'cxcxc',
        character_count: 5,
        voice_name: 'en-US-Wavenet-D',
        voice_speed: '1.0x',
        audio_format: 'MP3',
        audio_url:
          'https://res.cloudinary.com/dc7lr03my/video/upload/v1742117670/tts_audio/j4xsrjfwfu9vzi9dngg3.mp3',
        createdAt: '2025-03-16T09:34:32.238Z',
        updatedAt: '2025-03-16T09:34:32.238Z',
        publishedAt: '2025-03-16T09:34:32.265Z'
      },
      {
        id: 22,
        documentId: 'l8ph8g1uteokbz0q02s7d5cj',
        text: 'cxcxc',
        character_count: 5,
        voice_name: 'en-US-Wavenet-D',
        voice_speed: '1.0x',
        audio_format: 'MP3',
        audio_url:
          'https://res.cloudinary.com/dc7lr03my/video/upload/v1742117858/tts_audio/hsznc2irlonkqeza7lky.mp3',
        createdAt: '2025-03-16T09:37:40.419Z',
        updatedAt: '2025-03-16T09:37:40.419Z',
        publishedAt: '2025-03-16T09:37:40.447Z'
      },
      {
        id: 24,
        documentId: 'dbikmwei6njporjr8ik3qq6i',
        text: 'cxcxc',
        character_count: 5,
        voice_name: 'en-US-Wavenet-D',
        voice_speed: '1.0x',
        audio_format: 'MP3',
        audio_url:
          'https://res.cloudinary.com/dc7lr03my/video/upload/v1742118202/tts_audio/r41xvnoewf2kb4guexvv.mp3',
        createdAt: '2025-03-16T09:43:24.622Z',
        updatedAt: '2025-03-16T09:43:24.622Z',
        publishedAt: '2025-03-16T09:43:24.648Z'
      },
      {
        id: 26,
        documentId: 'cuv27owbz7jzy8krgngruf37',
        text: 'cxcxc',
        character_count: 5,
        voice_name: 'en-US-Wavenet-D',
        voice_speed: '1.0x',
        audio_format: 'MP3',
        audio_url:
          'https://res.cloudinary.com/dc7lr03my/video/upload/v1742118222/tts_audio/xvt0lqonseh1allurhzg.mp3',
        createdAt: '2025-03-16T09:43:44.052Z',
        updatedAt: '2025-03-16T09:43:44.052Z',
        publishedAt: '2025-03-16T09:43:44.065Z'
      },
      {
        id: 28,
        documentId: 'rffclzq53s3k0573l7gll4xt',
        text: 'cxcxc',
        character_count: 5,
        voice_name: 'en-US-Wavenet-D',
        voice_speed: '1.0x',
        audio_format: 'MP3',
        audio_url:
          'https://res.cloudinary.com/dc7lr03my/video/upload/v1742118940/tts_audio/o0wsdofocmquatolqyko.mp3',
        createdAt: '2025-03-16T09:55:42.745Z',
        updatedAt: '2025-03-16T09:55:42.745Z',
        publishedAt: '2025-03-16T09:55:42.776Z'
      }
    ],
    meta: { pagination: { page: 1, pageSize: 25, pageCount: 1, total: 14 } }
  }
}

export default async function MyFilesPage() {
  const data = await getData()

  return (
    <div className="container mx-auto p-4 border rounded-2xl">
      <MyFilesDataTable
        columns={columns}
        data={data.data}
        exportData={true}
        exportDataName="MyFiles"
      />
    </div>
  )
}
