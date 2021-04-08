from django.db.models import query
from django.db.models.query import QuerySet
from django.http import JsonResponse
from django.shortcuts import render

from rest_framework import viewsets
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework.serializers import Serializer
from django.core.files.storage import default_storage
from .serializers import ReviewSerializer
from .models import Review, Store
from accounts.models import User
from recommend.models import reviewcategory

from reviews import serializers

# Create your views here.
# 회원별 리뷰 불러오기


@api_view(['GET'])
def review_info(request, id):
    if User.objects.filter(id=id).exists():
        review = Review.objects.filter(user_id=id)
        
        review_data = []

        for i in review:
            store = Store.objects.get(id=i.store_id)

            review_data.append({
                "id": i.id,
                "user_id": i.user_id,
                "store_id": i.store_id,
                "store_name": store.store_name,
                "contents": i.contents,
                "write_date": i.write_date,
                "star": i.star,
                "image" : i.image,
            })
        
        return JsonResponse(review_data, safe=False, json_dumps_params={'ensure_ascii': False}, status=status.HTTP_200_OK)

    else:
        return Response({'message': '회원정보가 존재하지 않습니다'}, status=status.HTTP_400_BAD_REQUEST)


# 가게별 리뷰 불러오기
@api_view(['GET'])
def review_list(request, store_id):
    if Store.objects.filter(id=store_id).exists():
        review = Review.objects.filter(store_id=store_id)

        review_user = []

        for r in review:
            ru = User.objects.get(id=r.user_id)

            review_user.append({
                "id": r.id,
                "user_id": r.user_id,
                "nickname": ru.nickname,
                "contents": r.contents,
                "write_date": r.write_date,
                "store_id": r.store_id,
                "star": r.star,
                "image" : r.image,
            })

        return JsonResponse(review_user, safe=False, json_dumps_params={'ensure_ascii': False}, status=status.HTTP_200_OK)

    else:
        return Response({'message': '가게정보가 존재하지 않습니다'}, status=status.HTTP_400_BAD_REQUEST)


# 리뷰 목록 불러오기(최신 날짜 순 30개)
@api_view(['GET'])
def review_cur(request):
    list = Review.objects.all().order_by('-write_date')[:30]

    serializer = ReviewSerializer(list, many=True)

    return Response(serializer.data, status=status.HTTP_200_OK)

# 리뷰 작성
@api_view(['POST'])
def review_write(request):
    instance = Review.objects.create(
        user_id = request.data.get('user_id'),
        store_id = request.data.get('store_id'),
        contents = request.data.get('contents'),
        star = request.data.get('star'),
        write_date = request.data.get('write_date'),
        image = 0,
    )
    reid = instance.pk
    instance.save()
    re = Review.objects.get(id= reid)
    st = Store.objects.get(id = request.data.get('store_id'))

    file = request.FILES.getlist('files')
    
    #리뷰 이미지 저장
    index = 0
    store_index = 0
    for f in file:
        f.name = str(re.id)+ "_" + str(index)+".png"
        default_storage.save("review"+'/'+f.name, f)
        
        f.name = str(request.data.get('store_id')) +"_"+ str(store_index)+".png" 
        path = f.name
        while default_storage.exists("store"+'/'+path):
            store_index += 1
            f.name = str(request.data.get('store_id')) +"_"+ str(store_index)+".png" 
            path = f.name
        f.name = str(request.data.get('store_id')) +"_"+ str(store_index)+".png" 
        default_storage.save("store"+'/'+f.name, f)
        index += 1
    re.image = index
    re.save()
    
    if(request.data.get('Companion') == "부모님"):
        st.parent = st.parent + 1
    elif(request.data.get('Companion') == "친구"):
        st.friend = st.friend +1
    elif(request.data.get('Companion') == "반려동물"):
        st.pet = st.pet + 1
    elif(request.data.get('Companion') == "아이들"):
        st.children = st.children + 1
    st.image = st.image + index
    st.save()
    print("진입")
    # 스푼 카운트 갱신 및 등급 조정
    userdata = User.objects.filter(id=request.data.get('user_id')).values()
    spoon = userdata[0]["spoon_cnt"]
    userdata.update(
        spoon_cnt = spoon + 1
    )
    if spoon >=99:
        userdata.update(grade='gold')
    elif spoon >=49:
        userdata.update(grade='silver')


    # 리뷰 카테고리 카운팅
    ct = Store.objects.get(id=request.data.get('store_id'))
    main_ct = ct.main_category
    mid_ct = ct.middle_category
    
    reviewdata = reviewcategory.objects.filter(user_id=request.data.get('user_id')).values()

    if(main_ct=="한식"):
        if(mid_ct=="찜/탕"):
            reviewdata.update(
                krzzimandtang = reviewdata[0]["krzzimandtang"] + 1
            )
        elif(mid_ct=="고기집"):
            reviewdata.update(
                krbbq = reviewdata[0]["krbbq"] + 1
            )
        elif(mid_ct=="국밥"):
            reviewdata.update(
                krgukbap = reviewdata[0]["krgukbap"] + 1
            )
        elif(mid_ct=="전골/찌개"):
            reviewdata.update(
                krstewandcasserole = reviewdata[0]["krstewandcasserole"] + 1
            )
        elif(mid_ct=="족발/보쌈"):
            reviewdata.update(
                krporkfeetandBossam = reviewdata[0]["krporkfeetandBossam"] + 1
            )
        elif(mid_ct=="해산물"):
            reviewdata.update(
                krseafood = reviewdata[0]["krseafood"] + 1
            )
        elif(mid_ct=="면요리"):
            reviewdata.update(
                krnoodles = reviewdata[0]["krnoodles"] + 1
            )
        elif(mid_ct=="가정식"):
            reviewdata.update(
                krhomecooking = reviewdata[0]["krhomecooking"] + 1
            )
        elif(mid_ct=="치킨"):
            reviewdata.update(
                krchicken = reviewdata[0]["krchicken"] + 1
            )
        elif(mid_ct=="한식"):
            reviewdata.update(
                krfood = reviewdata[0]["krfood"] + 1
            )
    elif(main_ct=="분식"):
        reviewdata.update(
            bunsick = reviewdata[0]["bunsick"] + 1
        )
    elif(main_ct=="일식"):
        if(mid_ct=="튀김"):
            reviewdata.update(
                jpfriedfood = reviewdata[0]["jpfriedfood"] + 1
            )
        elif(mid_ct=="회"):
            reviewdata.update(
                jpsashimi = reviewdata[0]["jpsashimi"] + 1
            )
        elif(mid_ct=="가정식"):
            reviewdata.update(
                jphomecooking = reviewdata[0]["jphomecooking"] + 1
            )
        elif(mid_ct=="어패류"):
            reviewdata.update(
                jpseafood = reviewdata[0]["jpseafood"] + 1
            )
        elif(mid_ct=="면요리"):
            reviewdata.update(
                jpnoodles = reviewdata[0]["jpnoodles"] + 1
            )
        elif(mid_ct=="일식"):
            reviewdata.update(
                jpfood = reviewdata[0]["jpfood"] + 1
            )
    elif(main_ct=="카페"):
        if(mid_ct=="음료"):
            reviewdata.update(
                cddrink = reviewdata[0]["cddrink"] + 1
            )
        elif(mid_ct=="카페"):
            reviewdata.update(
                cdcafe = reviewdata[0]["cdcafe"] + 1
            )
        elif(mid_ct=="디저트"):
            reviewdata.update(
                cddessert = reviewdata[0]["cddessert"] + 1
            )
    elif(main_ct=="중식"):
        if(mid_ct=="면요리"):
            reviewdata.update(
                chnoodles = reviewdata[0]["chnoodles"] + 1
            )
        elif(mid_ct=="튀김요리"):
            reviewdata.update(
                chfriedfood = reviewdata[0]["chfriedfood"] + 1
            )
        elif(mid_ct=="구이요리"):
            reviewdata.update(
                chbbq = reviewdata[0]["chbbq"] + 1
            )
        elif(mid_ct=="해외요리"):
            reviewdata.update(
                chfood = reviewdata[0]["chfood"] + 1
            )
    elif(main_ct=="양식"):
        if(mid_ct=="면요리"):
            reviewdata.update(
                wenoodles = reviewdata[0]["wenoodles"] + 1
            )
        elif(mid_ct=="피자"):
            reviewdata.update(
                wepizza = reviewdata[0]["wepizza"] + 1
            )
        elif(mid_ct=="샐러드"):
            reviewdata.update(
                wesalad = reviewdata[0]["wesalad"] + 1
            )
        elif(mid_ct=="해외요리"):
            reviewdata.update(
                wefood = reviewdata[0]["wefood"] + 1
            )
    elif(main_ct=="술집"):
        if(mid_ct=="술집"):
            reviewdata.update(
                brbar = reviewdata[0]["brbar"] + 1
            )
        elif(mid_ct=="일본선술집"):
            reviewdata.update(
                brjpanbar = reviewdata[0]["brjpanbar"] + 1
            )
    elif(main_ct=="베이커리"):
        if(mid_ct=="빵집"):
            reviewdata.update(
                bkbakery = reviewdata[0]["bkbakery"] + 1
            )
    elif(main_ct=="패스트푸드"):
        if(mid_ct=="햄버거"):
            reviewdata.update(
                fffood = reviewdata[0]["fffood"] + 1
            )

    return Response({'success': True}, status=status.HTTP_201_CREATED)




# 리뷰 삭제(리뷰 번호 일치시 삭제)
@api_view(['DELETE'])
def review_del(request, id):
    if Review.objects.filter(id=id).exists():
        queryset = Review.objects.filter(id=id)
        return queryset.delete()

    else:
        return Response({'message': '리뷰정보가 존재하지 않습니다'}, status=status.HTTP_400_BAD_REQUEST)
